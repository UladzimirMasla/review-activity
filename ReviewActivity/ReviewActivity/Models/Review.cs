using System.Text.Json.Serialization;

namespace ReviewActivity.Models;

public class Review
{
    [JsonPropertyName("user")]
    public User User { get; set; } = default!;

    [JsonPropertyName("submitted_at")]
    public string SubmittedAt { get; set; } = "";

    [JsonPropertyName("state")]
    public string State { get; set; } = "";
}