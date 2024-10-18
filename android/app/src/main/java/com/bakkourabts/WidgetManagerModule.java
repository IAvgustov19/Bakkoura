package com.bakkourabts;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import androidx.work.WorkManager;
import androidx.work.OneTimeWorkRequest;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.concurrent.TimeUnit;
import androidx.work.PeriodicWorkRequest;

public class WidgetManagerModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private static AlarmManager alarmManager;
    private static PendingIntent pendingIntent;

    WidgetManagerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "WidgetManager";
    }

    @ReactMethod
    public void updateWidgetData(String time24, String extraTime, String time30) {
        Context context = getReactApplicationContext();
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);

        views.setTextViewText(R.id.widget_time24, time24);
        views.setTextViewText(R.id.widget_extraTime, extraTime);
        views.setTextViewText(R.id.widget_time30, time30);

        ComponentName widgetComponent = new ComponentName(context, YourWidgetProvider.class);
        appWidgetManager.updateAppWidget(widgetComponent, views);

        // Schedule periodic updates using AlarmManager
        scheduleWidgetUpdate(context);
    }

 public void scheduleWidgetUpdate(Context context) {
    //     PeriodicWorkRequest periodicWorkRequest = new PeriodicWorkRequest.Builder(
    //             WidgetUpdateWorker.class,
    //             15, TimeUnit.MINUTES
    //     ).build();

    //     WorkManager.getInstance(context).enqueue(periodicWorkRequest);
    // }
    Intent intent = new Intent(context, WidgetUpdateService.class);
    PendingIntent pendingIntent = PendingIntent.getService(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    if (alarmManager != null) {
        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), 15 * 60 * 1000, pendingIntent); // Every 15 minutes
    }

}}
