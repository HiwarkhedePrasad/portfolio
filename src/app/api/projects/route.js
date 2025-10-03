export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 50 ? limitParam : 6;
  const username = "HiwarkhedePrasad";
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "next-portfolio",
    },
    // Disable Next cache on the server for fresh results
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json([], { status: 200 });
  }

  const repos = await res.json();
  const simplified = (Array.isArray(repos) ? repos : [])
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, limit)
    .map((r) => ({
      name: r.name,
      stars: r.stargazers_count || 0,
      url: r.html_url,
    }));

  return Response.json(simplified, { status: 200 });
}


