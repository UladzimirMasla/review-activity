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

var since = DateTime.UtcNow.AddDays(-7); // Last 7 days
var reviewsCount = new Dictionary<string, int>();

Console.WriteLine($"Fetching PRs for repository: {repo}");

var prsUrl = $"https://api.github.com/repos/{owner}/{repo}/pulls?state=open&per_page=100";
var prsResponse = await httpClient.GetAsync(prsUrl);
prsResponse.EnsureSuccessStatusCode();

var prsJson = await prsResponse.Content.ReadAsStringAsync();
var prs = JsonSerializer.Deserialize<List<PullRequest>>(prsJson)!;

foreach (var pr in prs)
{
    // reviews are for final review result from the reviewers
    // comments endpoint for all comments
    var reviewsUrl = $"https://api.github.com/repos/{owner}/{repo}/pulls/{pr.Number}/reviews";
    var reviewsResponse = await httpClient.GetAsync(reviewsUrl);
    if (!reviewsResponse.IsSuccessStatusCode) continue;

    var reviewsJson = await reviewsResponse.Content.ReadAsStringAsync();
    var reviews = JsonSerializer.Deserialize<List<Review>>(reviewsJson)!;

    foreach (var review in reviews)
    {
        if (DateTime.TryParse(review.SubmittedAt, out var submittedAt) && submittedAt > since)
        {
            if (reviewsCount.ContainsKey(review.User.Login))
                reviewsCount[review.User.Login]++;
            else
                reviewsCount[review.User.Login] = 1;
        }
    }
}

var sorted = reviewsCount.OrderByDescending(kv => kv.Value).ToList();
var md = new StringBuilder();
md.AppendLine("| Reviewer | Reviews |");
md.AppendLine("|----------|---------|");

foreach (var (user, count) in sorted)
    md.AppendLine($"| {user} | {count} |");

Console.Write(md.ToString());
Console.WriteLine("Report generated successfully.");
