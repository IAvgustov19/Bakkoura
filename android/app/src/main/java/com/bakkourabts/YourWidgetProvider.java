package com.bts;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class YourWidgetProvider extends AppWidgetProvider {
    private Timer timer;
    private final Handler handler = new Handler();
    private Context context;
    private AppWidgetManager appWidgetManager;
    private int[] appWidgetIds;

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        this.context = context;
        this.appWidgetManager = appWidgetManager;
        this.appWidgetIds = appWidgetIds;

        // Initialize timer to update widget every second
        startTimer();
    }

    private void startTimer() {
        if (timer != null) {
            timer.cancel();
        }
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                handler.post(() -> updateWidget());
            }
        }, 0, 1000); // Update every second
    }

    private void updateWidget() {
        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);

            // Get current time
            Calendar now = Calendar.getInstance();
            int hours24 = now.get(Calendar.HOUR_OF_DAY);
            int minutes24 = now.get(Calendar.MINUTE);
            int seconds24 = now.get(Calendar.SECOND);

            // Calculate custom time units
            int totalMinutes24 = hours24 * 60 + minutes24;
            int totalMinutes30 = (int) (totalMinutes24 * 1.25);
            int customHours = totalMinutes30 / 60;
            int customMinutes = totalMinutes30 % 60;
            int customSeconds = (int) (seconds24 * 1.25); // Convert seconds to custom time units

            // Format times
            String time24 = String.format(Locale.getDefault(), "%02d:%02d:%02d", hours24, minutes24, seconds24);
            String time30 = String.format(Locale.getDefault(), "%02d:%02d:%02d", customHours, customMinutes, customSeconds);

            // Calculate extra time difference
            String extraTime = calculateTimeDifference(time24, time30);

            // Update widget views
            views.setTextViewText(R.id.widget_time24, time24);
            views.setTextViewText(R.id.widget_time30, time30);
            views.setTextViewText(R.id.widget_extraTime, extraTime);

            // Set click intent
            Intent intent = new Intent(context, YourWidgetProvider.class);
            intent.setAction("com.bts.ACTION_UPDATE_WIDGET");
            PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

            // Update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    private String calculateTimeDifference(String startTime, String endTime) {
        // Parse the start and end times
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
            start.setTime(sdf.parse(startTime));
            end.setTime(sdf.parse(endTime));
        } catch (Exception e) {
            e.printStackTrace();
            return "00:00";
        }

        // Calculate the difference in milliseconds
        long diffMillis = end.getTimeInMillis() - start.getTimeInMillis();
        long diffHours = (diffMillis / (1000 * 60 * 60)) % 24;
        long diffMinutes = (diffMillis / (1000 * 60)) % 60;

        // Format the result as HH:mm
        return String.format(Locale.getDefault(), "%02d:%02d", diffHours, diffMinutes);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        // Handle manual update action if needed
        if (intent.getAction() != null && intent.getAction().equals("com.bts.ACTION_UPDATE_WIDGET")) {
            // Perform action here, for example, launch MainActivity
            Intent launchIntent = new Intent(context, MainActivity.class);
            launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(launchIntent);
        }
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        // Stop the timer when the last widget is disabled
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }
}
