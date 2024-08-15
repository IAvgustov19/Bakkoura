import WidgetKit
import SwiftUI
import Foundation

extension Color {
    init(hex: String) {
        let cleanedHex = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        let scanner = Scanner(string: cleanedHex)
        var rgb: UInt64 = 0
        
        if scanner.scanHexInt64(&rgb) {
            let red = Double((rgb >> 16) & 0xFF) / 255.0
            let green = Double((rgb >> 8) & 0xFF) / 255.0
            let blue = Double(rgb & 0xFF) / 255.0
          self.init(red: red, green: green, blue: blue)
        } else {
            // Default to black if scanning fails
            self.init(red: 0, green: 0, blue: 0)
        }
    }
}

struct WidgetFamilyKey: EnvironmentKey {
    static let defaultValue: WidgetFamily = .systemSmall
}

extension EnvironmentValues {
    var widgetFamily: WidgetFamily {
        get { self[WidgetFamilyKey.self] }
        set { self[WidgetFamilyKey.self] = newValue }
    }
}

// Helper function to convert seconds to HH:mm format
func secondsToHM(_ seconds: Int) -> String {
    let hours = seconds / 3600
    let minutes = (seconds % 3600) / 60
    return String(format: "%02d:%02d", hours, minutes)
}

// Helper function to calculate extra time
func calculateExtraTime(from date: Date) -> String {
    let calendar = Calendar.current
    let totalSecondsToday = (calendar.component(.hour, from: date) * 3600) +
                             (calendar.component(.minute, from: date) * 60) +
                             calendar.component(.second, from: date)
    
    let dividedSeconds = totalSecondsToday / 4
    return secondsToHM(dividedSeconds)
}

// Helper function to format time24
func formatTime24(from date: Date) -> String {
    let nextTime = Calendar.current.date(byAdding: .second, value: 1, to: date)!
    return format(date: nextTime, format: "HH:mm")
}

// Helper function to format time30
func formatTime30(from date: Date) -> String {
    let calendar = Calendar.current
    let hour = calendar.component(.hour, from: date)
    let minute = calendar.component(.minute, from: date)
    let seconds = calendar.component(.second, from: date)
    
    // Convert current time to 30-hour format
    let totalSeconds = (hour * 3600) + (minute * 60) + seconds
    let total30 = totalSeconds + (totalSeconds / 4)
    let hours30 = (total30 / 3600) % 30
    let minutes30 = (total30 % 3600) / 60
    
    return String(format: "%02d:%02d", hours30, minutes30)
}

// Helper function to format date to a specific format
func format(date: Date, format: String) -> String {
    let formatter = DateFormatter()
    formatter.dateFormat = format
    return formatter.string(from: date)
}

// TimelineProvider
struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []

        let currentDate = Date()
        let calendar = Calendar.current

        // Generate a timeline with updates every minute
        for minuteOffset in 0 ..< 60 {
            let entryDate = calendar.date(byAdding: .second, value: minuteOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }
}

// TimelineEntry
struct SimpleEntry: TimelineEntry {
    let date: Date
}

// Widget View
struct WidgetBtsEntryView: View {
    var entry: SimpleEntry
    @Environment(\.widgetFamily) var widgetFamily

    var body: some View {
        let time24 = formatTime24(from: entry.date)
        let extraTime = calculateExtraTime(from: entry.date)
        let time30 = formatTime30(from: entry.date)

        ZStack {
          Color.clear
          
            Image("widget") // Replace with actual image
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .offset(y: 5)

            VStack(spacing: 2) {
              Text(time24)
                    .font(widgetFont(size: 14))
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)
                    
                Text(extraTime)
                    .font(widgetFont(size: 12))
                    .foregroundColor(.yellow)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)

              Text(time30)
                    .font(widgetFont(size: 14))
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)
            }
            .zIndex(1)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .widgetURL(URL(string: "widget://open")) // Optional: handle widget taps
    }

    private func widgetFont(size: CGFloat) -> Font {
        switch widgetFamily {
        case .systemLarge:
            return .system(size: size * 2) // Larger font size for large widgets
        case .systemMedium:
            return .system(size: size * 1.5) // Slightly larger font size for medium widgets
        default:
            return .system(size: size) // Default size
        }
    }
}

// Widget Configuration
struct WidgetBts: Widget {
    let kind: String = "WidgetBts"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            WidgetBtsEntryView(entry: entry)
                .environment(\.widgetFamily, .systemSmall) // Pass the default widget family here
                .containerBackground(Color(hex: "1C242A").gradient, for: .widget)
        }
        .configurationDisplayName("Bts Widget")
        .description("This is a time widget.")
    }
}

// Preview
#Preview(as: .systemSmall) {
    WidgetBts()
} timeline: {
    SimpleEntry(date: .now)
}
