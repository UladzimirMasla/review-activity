using System.Text.Json.Serialization;

namespace ReviewActivity.Models;

public class PullRequest
{
    [JsonPropertyName("number")]
    public int Number { get; set; }
}