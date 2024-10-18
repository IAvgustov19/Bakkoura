package com.bakkourabts;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.widget.RemoteViews;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import androidx.work.ForegroundInfo;

public class WidgetUpdateWorker extends Worker {

    private static final String CHANNEL_ID = "widget_update_channel";
    private static final int NOTIFICATION_ID = 1;

    public WidgetUpdateWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Result doWork() {
        Context context = getApplicationContext();
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);

        // Update widget views here (similar to updateWidgetData in WidgetManagerModule)
        // You can retrieve data from SharedPreferences or other storage to update the widget

        ComponentName widgetComponent = new ComponentName(context, YourWidgetProvider.class);
        appWidgetManager.updateAppWidget(widgetComponent, views);

        startForegroundService(context);

        return Result.success();
    }

    private void startForegroundService(Context context) {
        createNotificationChannel(context);

        Intent notificationIntent = new Intent(context, MainActivity.class); // Replace MainActivity with your main activity class
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setContentTitle("Widget Update Service")
                .setContentText("Updating widgets...")
                .setSmallIcon(android.R.drawable.ic_menu_info_details) // Using a default Android icon
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_LOW);

        NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(new NotificationChannel(CHANNEL_ID, "Widget Update Service", NotificationManager.IMPORTANCE_LOW));

        setForegroundAsync(new ForegroundInfo(NOTIFICATION_ID, notificationBuilder.build()));
    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Widget Update Service";
            String description = "Channel for widget update service";
            int importance = NotificationManager.IMPORTANCE_LOW;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
