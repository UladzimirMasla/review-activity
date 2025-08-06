using System.Text.Json.Serialization;

namespace ReviewActivity.Data;

public class PullRequest
{
    [JsonPropertyName("number")]
    public int Number { get; set; }
}