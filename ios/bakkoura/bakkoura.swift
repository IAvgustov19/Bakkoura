//
//  bakkoura.swift
//  bakkoura
//
//

import WidgetKit
import SwiftUI

struct WidgetData: Decodable {
    var text: String
}

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), text: "Placeholder")
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: configuration, text: "Snapshot")
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        let userDefaults = UserDefaults(suiteName: "group.com.bakkoura")
        let entryDate = Date()
        let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!

        if let savedData = userDefaults?.string(forKey: "widgetKey") {
            let decoder = JSONDecoder()
            if let data = savedData.data(using: .utf8),
               let parsedData = try? decoder.decode(WidgetData.self, from: data) {
                let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: parsedData.text)
                return Timeline(entries: [entry], policy: .atEnd)
            } else {
                print("Could not parse data")
            }
        }
        
        let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: "No data set")
        return Timeline(entries: [entry], policy: .atEnd)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationAppIntent
    let text: String
}

struct bakkouraEntryView: View {
    var entry: Provider.Entry

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .center) {
                    Image("streak")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 37, height: 37)
                    Text(entry.text)
                        .foregroundColor(Color(red: 1.00, green: 0.59, blue: 0.00))
                        .font(Font.system(size: 21, weight: .bold, design: .rounded))
                        .padding(.leading, -8.0)
                }
                .padding(.top, 10.0)
                .frame(maxWidth: .infinity)
                Text("Way to go!")
                    .foregroundColor(Color(red: 0.69, green: 0.69, blue: 0.69))
                    .font(Font.system(size: 14))
                    .frame(maxWidth: .infinity)
                Image("duo")
                    .renderingMode(.original)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(maxWidth: .infinity)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct bakkoura: Widget {
    let kind: String = "bakkoura"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            bakkouraEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

struct StreakWidget_Previews: PreviewProvider {
    static var previews: some View {
        bakkouraEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), text: "Widget preview"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}

extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}
