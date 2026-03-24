(function () {
  function itemMatchesTrackedPerson(item) {
    const matchesLeader = Object.keys(PARTY_LEADERS).some((party) => itemMatchesLeader(item, party));
    if (matchesLeader) return true;
    return allTrackedMembers().some((member) => itemMatchesMember(item, member));
  }

  function buildLeaderVoices(benchmarkParties, benchmarkFeed) {
    return benchmarkParties
      .map((party) => {
        const benchmark = benchmarkForLeader(party, benchmarkFeed);
        if (!benchmark) return null;
        return {
          name: benchmark.leaderName,
          party,
          mentions: benchmark.mentions,
          shareOfVoice: benchmark.shareOfVoice,
          growth: benchmark.growth,
          topSource: benchmark.topSources[0]?.label || "Engin heimild"
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.mentions - a.mentions)
      .slice(0, 4);
  }

  function renderFeedCards(feed, visibleFeed, selected) {
    if (!feed.length) {
      return '<div class="rounded-[24px] border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Engin atriði passa við núverandi síur.</div>';
    }

    return visibleFeed.map((item) => {
      const preview = truncateWords(item.summary, 100);
      const hasUrl = item.url && item.url !== "#";
      const active = selected && selected.id === item.id;
      return `<article class="rounded-[24px] border p-4 transition ${active ? "border-slate-950 bg-slate-950 text-white shadow-lg" : "border-slate-200 bg-white hover:border-slate-300"}">
        <button type="button" data-mention-id="${escapeHtml(item.id)}" class="mentionBtn block w-full text-left">
          <div class="flex flex-wrap items-center gap-2 text-xs font-medium ${active ? "text-slate-300" : "text-slate-500"}">
            <span class="rounded-full ${active ? "bg-white/10" : "bg-slate-100"} px-2.5 py-1">${escapeHtml(shortSourceLabel(item.source))}</span>
            <span class="rounded-full ${active ? "bg-amber-300 text-slate-950" : "bg-amber-100 text-amber-700"} px-2.5 py-1">${escapeHtml(displayLabel(item.topic))}</span>
            <span class="rounded-full px-2.5 py-1 ${sentimentClass(item.sentiment)}">${escapeHtml(displayLabel(item.sentiment))}</span>
            <span>${escapeHtml(formatRelative(item.publishedAt))}</span>
            <span>${escapeHtml(formatDateTime(item.publishedAt))}</span>
          </div>
          <div class="mt-3 text-base font-semibold leading-6">${escapeHtml(item.title)}</div>
          <p class="mt-2 text-sm leading-6 ${active ? "text-slate-300" : "text-slate-600"}">${escapeHtml(preview.text)}</p>
          <div class="mt-3 flex flex-wrap gap-4 text-xs ${active ? "text-slate-300" : "text-slate-500"}">
            <span>Flokkur ${escapeHtml(displayLabel(item.party))}</span>
            <span>Reach ${escapeHtml(item.reach)}</span>
            <span>Engagement ${escapeHtml(item.engagements)}</span>
            <span>Áhrif ${escapeHtml(String(Math.round(item.impactScore)))}</span>
          </div>
        </button>
        <div class="mt-4">${hasUrl ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold ${active ? "text-[#8ebeff]" : "text-[#1446dc]"}">Sjá meira</a>` : `<span class="text-sm font-semibold text-slate-400">Enginn hlekkur</span>`}</div>
      </article>`;
    }).join("");
  }

  function renderSelectedMention(selected) {
    if (!selected) {
      return '<div class="text-sm text-slate-500">Veldu atriði til að sjá nánari upplýsingar.</div>';
    }

    return `<div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Frétt í fókus</div>
        <h3 class="mt-2 text-2xl font-semibold text-slate-900">${escapeHtml(selected.title)}</h3>
      </div>
      <span class="rounded-full px-3 py-1 text-xs font-semibold ${sentimentClass(selected.sentiment)}">${escapeHtml(displayLabel(selected.sentiment))}</span>
    </div>
    <p class="mt-4 text-sm leading-7 text-slate-600">${escapeHtml(selected.summary || "Engin frekari lýsing fylgdi atriðinu.")}</p>
    <div class="mt-5 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl bg-white p-4">
        <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Heimild</div>
        <div class="mt-2 text-lg font-semibold text-slate-900">${escapeHtml(shortSourceLabel(selected.source))}</div>
        <div class="mt-1 text-sm text-slate-500">${escapeHtml(selected.author)}</div>
      </div>
      <div class="rounded-2xl bg-white p-4">
        <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Birting</div>
        <div class="mt-2 text-lg font-semibold text-slate-900">${escapeHtml(formatDateTime(selected.publishedAt))}</div>
        <div class="mt-1 text-sm text-slate-500">${escapeHtml(formatRelative(selected.publishedAt))}</div>
      </div>
      <div class="rounded-2xl bg-white p-4">
        <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Málefni / flokkur</div>
        <div class="mt-2 text-lg font-semibold text-slate-900">${escapeHtml(displayLabel(selected.topic))}</div>
        <div class="mt-1 text-sm text-slate-500">${escapeHtml(displayLabel(selected.party))}</div>
      </div>
      <div class="rounded-2xl bg-white p-4">
        <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Áhrif</div>
        <div class="mt-2 text-lg font-semibold text-slate-900">${escapeHtml(String(Math.round(selected.impactScore)))}</div>
        <div class="mt-1 text-sm text-slate-500">${escapeHtml(selected.engagements)} engagement</div>
      </div>
    </div>`;
  }

  function renderNewsFeedSection(feed, visibleFeed, selected, parties, topics, members, sources) {
    return `<section class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Fréttavakt</div>
          <h2 class="mt-1 text-2xl font-semibold text-slate-900">Rauntíma umræða</h2>
        </div>
        <div class="flex flex-col gap-2 sm:flex-row">
          <input id="searchInput" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" placeholder="Leita í fréttum, flokki eða nafni..." value="${escapeHtml(state.search)}" />
          <select id="sortSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
            <option value="impact" ${state.sortBy === "impact" ? "selected" : ""}>Raða eftir áhrifum</option>
            <option value="latest" ${state.sortBy === "latest" ? "selected" : ""}>Raða eftir nýjustu</option>
            <option value="engagement" ${state.sortBy === "engagement" ? "selected" : ""}>Raða eftir virkni</option>
          </select>
        </div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-5">
        <select id="partySelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allir flokkar</option>${parties.map((party) => `<option value="${escapeHtml(party)}" ${state.selectedParty === party ? "selected" : ""}>${escapeHtml(displayLabel(party))}</option>`).join("")}</select>
        <select id="topicSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Öll málefni</option>${topics.map((topic) => `<option value="${escapeHtml(topic)}" ${state.selectedTopic === topic ? "selected" : ""}>${escapeHtml(displayLabel(topic))}</option>`).join("")}</select>
        <select id="memberSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allir leiðtogar og þingmenn</option>${members.map((member) => `<option value="${escapeHtml(member)}" ${state.selectedMember === member ? "selected" : ""}>${escapeHtml(displayMemberName(member))}</option>`).join("")}</select>
        <select id="sourceSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allar rásir</option>${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.selectedSource === source ? "selected" : ""}>${escapeHtml(shortSourceLabel(source))}</option>`).join("")}</select>
        <select id="sentimentSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allt sentiment</option><option value="jakvaed" ${state.selectedSentiment === "jakvaed" ? "selected" : ""}>Jákvætt</option><option value="neikvaed" ${state.selectedSentiment === "neikvaed" ? "selected" : ""}>Neikvætt</option><option value="blandad" ${state.selectedSentiment === "blandad" ? "selected" : ""}>Blandað</option><option value="hlutlaus" ${state.selectedSentiment === "hlutlaus" ? "selected" : ""}>Hlutlaust</option></select>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">${state.dashboard.keywords.slice(0, 8).map((keyword) => `<button data-keyword="${escapeHtml(keyword)}" class="keywordBtn rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">#${escapeHtml(displayLabel(keyword))}</button>`).join("")}<button id="clearFiltersBtn" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Hreinsa síur</button></div>
      <div class="mt-8 space-y-4">${renderFeedCards(feed, visibleFeed, selected)}${feed.length > state.visibleFeedCount ? `<div class="flex justify-center pt-4"><button id="toggleFeedBtn" type="button" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">Sjá meira (${Math.min(10, feed.length - state.visibleFeedCount)} í viðbót)</button></div>` : ""}</div>
      <div class="mt-6 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,_#fff7ed,_#ffffff)] p-5">${renderSelectedMention(selected)}</div>
    </section>`;
  }

  window.renderSecondaryPage = function renderSecondaryPageOverride(context) {
    const {
      app,
      currentPage,
      pageConfig,
      feed,
      visibleFeed,
      selected,
      sources,
      parties,
      members,
      topics,
      benchmarkParties,
      comparePartyA,
      comparePartyB,
      benchmarkA,
      benchmarkB,
      compareLeaderA,
      compareLeaderB,
      leaderBenchmarkA,
      leaderBenchmarkB,
      voices,
      heroStatus
    } = context;

    const feedTitle = currentPage === "flokkar" ? "Umtal um flokka" : "Umtal um formenn og þingmenn";
    const feedDescription = currentPage === "flokkar"
      ? "Skoðaðu pólitíska umræðu milli flokka, fylgstu með efstu málefnum og þrengdu strauminn niður."
      : "Fylgstu með umfjöllun um formenn og þingmenn, síaðu eftir nöfnum og sjáðu hvaða heimildir og málefni gefa mestan sýnileika.";
    const filterFields = currentPage === "flokkar"
      ? `
        <select id="partySelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allir flokkar</option>${parties.map((party) => `<option value="${escapeHtml(party)}" ${state.selectedParty === party ? "selected" : ""}>${escapeHtml(displayLabel(party))}</option>`).join("")}</select>
        <select id="topicSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Öll málefni</option>${topics.map((topic) => `<option value="${escapeHtml(topic)}" ${state.selectedTopic === topic ? "selected" : ""}>${escapeHtml(displayLabel(topic))}</option>`).join("")}</select>
        <select id="sourceSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allar rásir</option>${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.selectedSource === source ? "selected" : ""}>${escapeHtml(shortSourceLabel(source))}</option>`).join("")}</select>
        <select id="sentimentSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allt sentiment</option><option value="jakvaed" ${state.selectedSentiment === "jakvaed" ? "selected" : ""}>Jákvætt</option><option value="neikvaed" ${state.selectedSentiment === "neikvaed" ? "selected" : ""}>Neikvætt</option><option value="blandad" ${state.selectedSentiment === "blandad" ? "selected" : ""}>Blandað</option><option value="hlutlaus" ${state.selectedSentiment === "hlutlaus" ? "selected" : ""}>Hlutlaust</option></select>
      `
      : `
        <select id="memberSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allir leiðtogar og þingmenn</option>${members.map((member) => `<option value="${escapeHtml(member)}" ${state.selectedMember === member ? "selected" : ""}>${escapeHtml(displayMemberName(member))}</option>`).join("")}</select>
        <select id="partySelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allir flokkar</option>${parties.map((party) => `<option value="${escapeHtml(party)}" ${state.selectedParty === party ? "selected" : ""}>${escapeHtml(displayLabel(party))}</option>`).join("")}</select>
        <select id="sourceSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allar rásir</option>${sources.map((source) => `<option value="${escapeHtml(source)}" ${state.selectedSource === source ? "selected" : ""}>${escapeHtml(shortSourceLabel(source))}</option>`).join("")}</select>
        <select id="sentimentSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="all">Allt sentiment</option><option value="jakvaed" ${state.selectedSentiment === "jakvaed" ? "selected" : ""}>Jákvætt</option><option value="neikvaed" ${state.selectedSentiment === "neikvaed" ? "selected" : ""}>Neikvætt</option><option value="blandad" ${state.selectedSentiment === "blandad" ? "selected" : ""}>Blandað</option><option value="hlutlaus" ${state.selectedSentiment === "hlutlaus" ? "selected" : ""}>Hlutlaust</option></select>
      `;

    const compareSection = `<section class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Compare / Benchmark</div>
          <h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Samanburður flokka hlið við hlið</h2>
          <p class="mt-2 max-w-3xl text-sm text-[#60779a]">Ber saman share of voice, sentiment, growth, efstu málefni og helstu heimildir fyrir tvo flokka.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <select id="comparePartyA" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm">${benchmarkParties.map((party) => `<option value="${escapeHtml(party)}" ${comparePartyA === party ? "selected" : ""}>${escapeHtml(displayLabel(party))}</option>`).join("")}</select>
          <select id="comparePartyB" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm">${benchmarkParties.map((party) => `<option value="${escapeHtml(party)}" ${comparePartyB === party ? "selected" : ""}>${escapeHtml(displayLabel(party))}</option>`).join("")}</select>
        </div>
      </div>
      <div class="mt-6 grid gap-6 xl:grid-cols-2">
        ${benchmarkA ? renderBenchmarkCard(benchmarkA, "bg-[#dceaff] text-[#1446dc]") : `<div class="text-sm text-slate-500">Vantar samanburðargögn.</div>`}
        ${benchmarkB ? renderBenchmarkCard(benchmarkB, "bg-[#e8f2ff] text-[#00258c]") : `<div class="text-sm text-slate-500">Vantar samanburðargögn.</div>`}
      </div>
    </section>`;

    const leaderSection = `<section class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Leader Benchmark</div>
          <h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Samanburður formanna og umræðu</h2>
          <p class="mt-2 max-w-3xl text-sm text-[#60779a]">Ber saman umræðu um formenn flokkanna sjálfa út frá nafnaumfjöllun í fréttum og straumum.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <select id="compareLeaderA" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm">${benchmarkParties.map((party) => `<option value="${escapeHtml(party)}" ${compareLeaderA === party ? "selected" : ""}>${escapeHtml(PARTY_LEADERS[party]?.name || displayLabel(party))}</option>`).join("")}</select>
          <select id="compareLeaderB" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm">${benchmarkParties.map((party) => `<option value="${escapeHtml(party)}" ${compareLeaderB === party ? "selected" : ""}>${escapeHtml(PARTY_LEADERS[party]?.name || displayLabel(party))}</option>`).join("")}</select>
        </div>
      </div>
      <div class="mt-6 grid gap-6 xl:grid-cols-2">
        ${leaderBenchmarkA ? renderLeaderBenchmarkCard(leaderBenchmarkA, "bg-[#dceaff] text-[#1446dc]") : `<div class="text-sm text-slate-500">Vantar leiðtogagögn.</div>`}
        ${leaderBenchmarkB ? renderLeaderBenchmarkCard(leaderBenchmarkB, "bg-[#e8f2ff] text-[#00258c]") : `<div class="text-sm text-slate-500">Vantar leiðtogagögn.</div>`}
      </div>
    </section>`;

    const analyticsSection = `<section class="grid gap-8 lg:grid-cols-3">
      <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]"><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Competitive share</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Flokkar í umræðu</h2><div class="mt-5 space-y-4">${renderBarChart(state.dashboard.parties.map((item) => ({ label: displayLabel(item.name), value: item.mentions })), "bg-gradient-to-r from-[#00258c] to-[#1446dc]")}</div></div>
      <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]"><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Topic share</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Trending topics</h2><div class="mt-5 space-y-4">${renderBarChart(state.dashboard.topics.map((item) => ({ label: displayLabel(item.label), value: item.value })), "bg-gradient-to-r from-[#3a8dde] to-[#1446dc]")}</div></div>
      <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]"><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Channel mix</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Source health</h2><div class="mt-5 space-y-4">${renderBarChart(state.dashboard.channelBreakdown, "bg-gradient-to-r from-[#081c40] to-[#3a8dde]")}</div></div>
    </section>`;

    const pollingSection = `<section class="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
      <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]">
        <div class="flex items-center justify-between gap-3"><div><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Polling intelligence</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Maskína og aðrar kannanir</h2></div><div class="rounded-full bg-[#dceaff] px-3 py-1 text-xs font-semibold text-[#1446dc]">${escapeHtml(String(state.dashboard.polls.length))} heimildir</div></div>
        <div class="mt-6 space-y-4">${renderPollList(state.dashboard.polls || [])}</div>
      </div>
      <div class="space-y-8">
        <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]"><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Poll average</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Meðaltal fylgis</h2><div class="mt-5 space-y-4">${renderBarChart((state.dashboard.pollAverage || []).map((row) => ({ label: displayLabel(row.party), value: row.percentage })), "bg-gradient-to-r from-indigo-500 to-sky-400")}</div></div>
        <div class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]"><div class="text-xs uppercase tracking-[0.24em] text-[#5b7397]">Seat projection</div><h2 class="mt-1 text-2xl font-semibold text-[#081c40]">Þingsætaskipting</h2><div class="mt-5 space-y-4">${renderSeatProjection(state.dashboard.seatProjection || [])}</div></div>
      </div>
    </section>`;

    const feedSection = `<section class="rounded-[32px] border border-[#d7e3fb] bg-white p-6 shadow-[0_18px_50px_rgba(0,37,140,0.08)]">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Síað feed</div>
          <h2 class="mt-1 text-2xl font-semibold text-slate-900">${feedTitle}</h2>
          <p class="mt-2 max-w-2xl text-sm text-[#60779a]">${feedDescription}</p>
        </div>
        <div class="flex flex-col gap-2 sm:flex-row">
          <input id="searchInput" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" placeholder="Leita í feedi..." value="${escapeHtml(state.search)}" />
          <select id="sortSelect" class="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"><option value="impact" ${state.sortBy === "impact" ? "selected" : ""}>Raða eftir áhrifum</option><option value="latest" ${state.sortBy === "latest" ? "selected" : ""}>Raða eftir nýjustu</option><option value="engagement" ${state.sortBy === "engagement" ? "selected" : ""}>Raða eftir virkni</option></select>
        </div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-4">${filterFields}</div>
      <div class="mt-4 flex flex-wrap gap-2">${state.dashboard.keywords.slice(0, 8).map((keyword) => `<button data-keyword="${escapeHtml(keyword)}" class="keywordBtn rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">#${escapeHtml(displayLabel(keyword))}</button>`).join("")}<button id="clearFiltersBtn" class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Hreinsa síur</button></div>
      <div class="mt-8 space-y-4">${renderFeedCards(feed, visibleFeed, selected)}${feed.length > state.visibleFeedCount ? `<div class="flex justify-center pt-4"><button id="toggleFeedBtn" type="button" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">Sjá meira (${Math.min(10, feed.length - state.visibleFeedCount)} í viðbót)</button></div>` : ""}</div>
      <div class="mt-6 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,_#fff7ed,_#ffffff)] p-5">${renderSelectedMention(selected)}</div>
    </section>`;

    app.innerHTML = `
      <div class="space-y-10">
        <section class="overflow-hidden rounded-[36px] border border-[#0f2f78] bg-[#00258c] text-white shadow-[0_30px_90px_rgba(8,28,64,0.28)]">
          <div class="p-7 lg:p-10">
            <div>
              <div class="inline-flex rounded-full border border-[#6f9cf0] bg-[#081c40] px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffffff]">${escapeHtml(pageConfig.badge)}</div>
              <h1 class="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">${escapeHtml(pageConfig.title)}</h1>
              <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-300">${escapeHtml(pageConfig.description)}</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <button id="refreshBtn" class="rounded-full bg-[#3a8dde] px-4 py-2 text-sm font-semibold text-white">Endurlesa gögn</button>
                <button id="toggleAutoRefreshBtn" class="rounded-full border border-[#6f9cf0] bg-[#081c40] px-4 py-2 text-sm font-semibold text-white">${state.autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}</button>
                <div class="rounded-full border border-[#6f9cf0] bg-[#081c40] px-4 py-2 text-sm text-white">${escapeHtml(heroStatus)}</div>
              </div>
            </div>
          </div>
        </section>
        ${currentPage === "flokkar" ? compareSection : leaderSection}
        ${currentPage === "flokkar" ? `${analyticsSection}${pollingSection}` : `<section>${renderVoicesInFocus(voices)}</section>`}
        ${feedSection}
      </div>`;

    bindEvents();
  };

  window.render = function renderOverride() {
    const app = document.getElementById("app");
    const currentPage = currentPageFromLocation();
    const pageConfig = PAGE_CONFIG[currentPage];
    document.title = currentPage === "frettir" ? "Sjálfstæðisvaktin" : `${pageConfig.title} | Sjálfstæðisvaktin`;
    const feed = filteredFeed();
    const effectiveFeed = currentPage === "leidtogar" && state.selectedMember === "all" && state.selectedParty === "all"
      ? feed.filter((item) => itemMatchesTrackedPerson(item))
      : currentPage === "flokkar" && state.selectedParty === "all"
        ? feed.filter((item) => canonicalParty(item.party || "") !== "Oflokkat")
        : feed;
    const visibleFeed = effectiveFeed.slice(0, state.visibleFeedCount);
    const selected = selectedMention(effectiveFeed);
    const sources = [...new Set([...state.dashboard.feed.map((item) => item.source), "VB", "BBC World", "POLITICO Europe"])].sort();
    const parties = sortPartyOptions([...Object.keys(PARTY_ALIASES), ...state.dashboard.feed.map((item) => item.party), "Oflokkat"]);
    const members = allTrackedMembers();
    const benchmarkFeed = feedForBenchmark();
    const benchmarkParties = parties.filter((party) => party !== "Oflokkat");
    const comparePartyA = benchmarkParties.includes(state.comparePartyA) ? state.comparePartyA : benchmarkParties[0];
    const comparePartyB = benchmarkParties.includes(state.comparePartyB) ? state.comparePartyB : benchmarkParties.find((party) => party !== comparePartyA) || benchmarkParties[0];
    const benchmarkA = comparePartyA ? benchmarkForParty(comparePartyA, benchmarkFeed) : null;
    const benchmarkB = comparePartyB ? benchmarkForParty(comparePartyB, benchmarkFeed) : null;
    const compareLeaderA = benchmarkParties.includes(state.compareLeaderA) ? state.compareLeaderA : benchmarkParties[0];
    const compareLeaderB = benchmarkParties.includes(state.compareLeaderB) ? state.compareLeaderB : benchmarkParties.find((party) => party !== compareLeaderA) || benchmarkParties[0];
    const leaderBenchmarkA = compareLeaderA ? benchmarkForLeader(compareLeaderA, benchmarkFeed) : null;
    const leaderBenchmarkB = compareLeaderB ? benchmarkForLeader(compareLeaderB, benchmarkFeed) : null;
    const curatedPoliticalFeed = editorialPoliticalFeed(benchmarkFeed);
    const summary = weekSummary(curatedPoliticalFeed);
    const voices = buildLeaderVoices(benchmarkParties, benchmarkFeed);
    const topics = [...new Set(state.dashboard.feed.map((item) => item.topic))].sort();
    const heroStatus = state.loading ? "Sæki lifandi gögn..." : state.usingDemoData ? "Sýni gagnvirka demo-strauma" : "Lifandi vöktun virk";

    if (currentPage !== "frettir") {
      window.renderSecondaryPage({
        app,
        currentPage,
        pageConfig,
        feed: effectiveFeed,
        visibleFeed,
        selected,
        sources,
        parties,
        members,
        topics,
        benchmarkParties,
        comparePartyA,
        comparePartyB,
        benchmarkA,
        benchmarkB,
        compareLeaderA,
        compareLeaderB,
        leaderBenchmarkA,
        leaderBenchmarkB,
        curatedPoliticalFeed,
        summary,
        voices,
        heroStatus
      });
      return;
    }

    app.innerHTML = `
      <div class="space-y-10">
        <section class="overflow-hidden rounded-[36px] border border-[#0f2f78] bg-[#00258c] text-white shadow-[0_30px_90px_rgba(8,28,64,0.28)]">
          <div class="p-7 lg:p-10">
            <div>
              <div class="inline-flex rounded-full border border-[#6f9cf0] bg-[#081c40] px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffffff]">${escapeHtml(pageConfig.badge)}</div>
              <h1 class="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">${escapeHtml(pageConfig.title)}</h1>
              <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-300">${escapeHtml(pageConfig.description)}</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <button id="refreshBtn" class="rounded-full bg-[#3a8dde] px-4 py-2 text-sm font-semibold text-white">Endurlesa gögn</button>
                <button id="toggleAutoRefreshBtn" class="rounded-full border border-[#6f9cf0] bg-[#081c40] px-4 py-2 text-sm font-semibold text-white">${state.autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}</button>
                <div class="rounded-full border border-[#6f9cf0] bg-[#081c40] px-4 py-2 text-sm text-white">${escapeHtml(heroStatus)}</div>
              </div>
            </div>
          </div>
        </section>
        <section class="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          ${renderLatestAnalysis(curatedPoliticalFeed, selected)}
          ${renderWeekSummary(summary)}
        </section>
        ${renderNewsFeedSection(effectiveFeed, visibleFeed, selected, parties, topics, members, sources)}
      </div>`;

    bindEvents();
  };

  if (typeof state !== "undefined") {
    window.render();
  }
})();
