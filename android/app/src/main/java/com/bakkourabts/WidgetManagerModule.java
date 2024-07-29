package com.bts;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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

    private void scheduleWidgetUpdate(Context context) {
        Intent intent = new Intent(context, WidgetUpdateService.class);
        pendingIntent = PendingIntent.getService(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        if (alarmManager == null) {
            alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        }

        // Cancel any existing alarms to avoid duplicate pending intents
        alarmManager.cancel(pendingIntent);

        // Schedule the service to run periodically
        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), AlarmManager.INTERVAL_HOUR, pendingIntent);
    }
}
