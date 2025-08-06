using System.Text.Json.Serialization;

namespace ReviewActivity.Data;

public class Review
{
    [JsonPropertyName("user")]
    public User User { get; set; } = default!;

    [JsonPropertyName("submitted_at")]
    public DateTimeOffset? SubmittedAt { get; set; } = null;

    [JsonPropertyName("state")]
    public string State { get; set; } = "";

    [JsonPropertyName("html_url")]
    public string HtmlUrl { get; set; } = "";
}