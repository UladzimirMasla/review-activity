using System.Text.Json.Serialization;

namespace ReviewActivity.Models;

public class User
{
    [JsonPropertyName("login")]
    public string Login { get; set; } = "";

    [JsonPropertyName("url")]
    public string Url { get; set; } = "";

    [JsonPropertyName("avatar_url")]
    public string AvatarUrl { get; set; } = "";
}