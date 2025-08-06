using System.Text.Json;
using Bogus;
using ReviewActivity.Data;

var userFaker = new Faker<User>()
    .RuleFor(u => u.Login, f => f.Internet.UserName())
    .RuleFor(u => u.Url, f => f.Internet.Url())
    .RuleFor(u => u.AvatarUrl, f => f.Internet.Avatar());
var pullOfUsers = userFaker.Generate(10);

var random = new Random();
var reviewFaker = new Faker<Review>()
    .RuleFor(r => r.User, f => pullOfUsers[random.Next(0,10)])
    .RuleFor(r => r.SubmittedAt, f => f.Date.PastOffset(refDate: DateTime.UtcNow.AddMonths(-1)))
    .RuleFor(r => r.State, f => f.PickRandom(new[] { "APPROVED", "CHANGES_REQUESTED", "COMMENTED" }))
    .RuleFor(r => r.HtmlUrl, f => f.Internet.Url());

var fakeJson = JsonSerializer.Serialize(reviewFaker.Generate(100), new JsonSerializerOptions { WriteIndented = true });;
File.WriteAllText(Path.Combine(GetRepoRootFullPath(), "gh-pages/fake-reviews.json"), fakeJson);


static string GetRepoRootFullPath()
{
    return Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", ".."));
}
