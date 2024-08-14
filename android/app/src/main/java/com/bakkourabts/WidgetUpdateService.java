package com.bts;

import android.app.IntentService;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

public class WidgetUpdateService extends IntentService {

    public WidgetUpdateService() {
        super("WidgetUpdateService");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        Context context = getApplicationContext();
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_layout);

        // Update widget views here (similar to updateWidgetData in WidgetManagerModule)
        // You can retrieve data from SharedPreferences or other storage to update the widget

        ComponentName widgetComponent = new ComponentName(context, YourWidgetProvider.class);
        appWidgetManager.updateAppWidget(widgetComponent, views);
    }
}
