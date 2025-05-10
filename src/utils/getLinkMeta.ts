export default function getLinkMeta(url: string) {
    const domain = new URL(url).hostname.toLowerCase();
  
    if (domain.includes("onlyfans")) {
      return { title: "OnlyFans", icon: "🔵" };
    } else if (domain.includes("instagram")) {
      return { title: "Instagram", icon: "📸" };
    } else if (domain.includes("twitter") || domain.includes("x.com")) {
      return { title: "Twitter/X", icon: "🐦" };
    } else if (domain.includes("tiktok")) {
      return { title: "TikTok", icon: "🎵" };
    }
  
    return { title: domain, icon: "🔗" };
  }
  