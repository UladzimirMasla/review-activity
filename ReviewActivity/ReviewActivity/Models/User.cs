using System.Text.Json.Serialization;

namespace ReviewActivity.Models;

public class User
{
    [JsonPropertyName("login")]
    public string Login { get; set; } = "";
}