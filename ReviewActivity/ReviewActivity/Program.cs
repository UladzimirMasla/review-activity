using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using ReviewActivity.Models;

const string githubTokenEnvKey = "API_GITHUB_TOKEN";
const string repositoryEnvKey = "REPOSITORY";
const string ownerEnvKey = "OWNER";

var ghToken = Environment.GetEnvironmentVariable(githubTokenEnvKey) ?? throw new Exception($"'{githubTokenEnvKey}' not set in environment variables");
var repo = Environment.GetEnvironmentVariable(repositoryEnvKey) ?? throw new Exception($"'{repositoryEnvKey}' not set in environment variables");
var owner = Environment.GetEnvironmentVariable(ownerEnvKey) ?? throw new Exception($"'{ownerEnvKey}' not set in environment variables");

var httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", ghToken);
httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("MAS Github Review Activity Script");

Console.WriteLine($"Fetching PRs for repository: {repo}");
var prsUrl = $"https://api.github.com/repos/{owner}/{repo}/pulls";
var prsResponse = await httpClient.GetAsync(prsUrl);
prsResponse.EnsureSuccessStatusCode();

var prsJson = await prsResponse.Content.ReadAsStringAsync();
var prs = JsonSerializer.Deserialize<List<PullRequest>>(prsJson)!;

var allReviews = new List<Review>();
var since = DateTime.UtcNow.AddMonths(-1);
foreach (var pr in prs)
{
    var reviewsUrl = $"https://api.github.com/repos/{owner}/{repo}/pulls/{pr.Number}/reviews";
    var reviewsResponse = await httpClient.GetAsync(reviewsUrl);
    if (!reviewsResponse.IsSuccessStatusCode) continue;

    var reviewsJson = await reviewsResponse.Content.ReadAsStringAsync();
    var reviews = JsonSerializer.Deserialize<List<Review>>(reviewsJson)!;
    allReviews.AddRange(reviews.Where(review => review.SubmittedAt != null && review.SubmittedAt >= since));
}

var allReviewsJson = JsonSerializer.Serialize(allReviews, new JsonSerializerOptions { WriteIndented = true });
Directory.CreateDirectory(Path.Combine(GetBaseFullPath(), "output"));
File.WriteAllText(Path.Combine(GetBaseFullPath(), "output/reviews.json"), allReviewsJson);


string GetBaseFullPath()
{
    return Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".."));
}
