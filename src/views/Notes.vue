<template>
  <div class="notes-root">

    <!-- ── SEARCH HEADER ────────────────────────────── -->
    <div class="search-header">
      <div class="search-container">
        <div class="search-wrap" :class="{ focused: searchFocused }">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref="searchInputEl"
            v-model="searchQuery"
            class="search-input"
            placeholder="Search notes..."
            autocomplete="off"
            spellcheck="false"
            @focus="searchFocused = true"
            @blur="onSearchBlur"
            @keydown="onSearchKeydown"
          />
          <button v-if="searchQuery" class="search-clear" @mousedown.prevent @click="clearSearch">✕</button>
          <span v-else class="search-kbd">/</span>
        </div>

        <!-- Suggestions dropdown -->
        <Transition name="sug">
          <div
            v-if="searchFocused && searchQuery.trim()"
            class="suggestions"
            @mousedown.prevent
          >
            <template v-if="searchResults.length">
              <button
                v-for="(r, i) in searchResults"
                :key="r.id"
                class="sug-item"
                :class="{ 'sug-sel': i === selectedSuggestion }"
                @click="goToResult(r)"
              >
                <span class="sug-arrow">↗</span>
                <span class="sug-body">
                  <span class="sug-label" v-html="hlText(r.label)"></span>
                  <span class="sug-meta">
                    <span class="sug-cat">{{ r.catIcon }} {{ r.catLabel }}</span>
                    <span v-if="r.excerpt" class="sug-excerpt" v-html="hlText(r.excerpt)"></span>
                  </span>
                </span>
              </button>
            </template>
            <div v-else class="sug-empty">No results for "<em>{{ searchQuery }}</em>"</div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ── CONTENT ─────────────────────────────────── -->
    <main class="content-area">

      <!-- Welcome screen -->
      <div v-if="!activeSection" class="welcome">
        <p class="welcome-pre">// personal knowledge base</p>
        <h1 class="welcome-title">NOTES</h1>

        <div class="tg-wrap">
          <!-- Root node -->
          <button
            class="tg-root-node"
            :class="{ 'tg-root-open': bbWelcomeOpen }"
            @click="bbWelcomeOpen = !bbWelcomeOpen"
          >
            <span class="tg-root-dot"></span>
            <span class="tg-root-label">Bug Bounty</span>
            <span class="tg-root-count">{{ categories.reduce((s, c) => s + c.items.length, 0) }} sections</span>
            <span class="tg-root-chev" :class="{ open: bbWelcomeOpen }">›</span>
          </button>

          <!-- Level 1: Categories -->
          <Transition name="tg">
            <div v-if="bbWelcomeOpen" class="tg-branch">
              <div v-for="cat in categories" :key="cat.id" class="tg-cat-wrap">
                <button
                  class="tg-cat-node"
                  :class="{ 'tg-cat-open': openWelcomeCats.has(cat.id) }"
                  @click="toggleWelcomeCat(cat.id)"
                >
                  <span class="tg-cat-dot"></span>
                  <span class="tg-cat-icon">{{ cat.icon }}</span>
                  <span class="tg-cat-label">{{ cat.label }}</span>
                  <span class="tg-cat-count">{{ cat.items.length }}</span>
                  <span class="tg-cat-chev" :class="{ open: openWelcomeCats.has(cat.id) }">›</span>
                </button>

                <!-- Level 2: Items -->
                <Transition name="tg">
                  <div v-if="openWelcomeCats.has(cat.id)" class="tg-items-branch">
                    <button
                      v-for="item in cat.items"
                      :key="item.id"
                      class="tg-item-node"
                      @click="selectSection(item.id)"
                    >
                      <span class="tg-item-dot"></span>
                      <span class="tg-item-label">{{ item.label }}</span>
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Section content -->
      <article v-else class="section-view">
        <div class="breadcrumb">
          <span class="bc-root" @click="activeSection = null">Notes</span>
          <span class="bc-sep"> / </span>
          <span class="bc-cat">{{ activeCategoryLabel }}</span>
          <span class="bc-sep"> / </span>
          <span class="bc-current">{{ activeSectionData?.title }}</span>
        </div>

        <h1 class="section-title" v-html="hlText(activeSectionData?.title)"></h1>

        <div class="section-body">
          <template v-for="(block, i) in activeSectionData?.content" :key="i">
            <p    v-if="block.type === 'p'"       class="b-p" v-html="hlText(block.text)"></p>
            <h2   v-else-if="block.type === 'h2'" class="b-h2" v-html="hlText(block.text)"></h2>
            <h3   v-else-if="block.type === 'h3'" class="b-h3" v-html="hlText(block.text)"></h3>
            <pre  v-else-if="block.type === 'code'" class="b-code"><code v-html="hlCode(block.text)"></code></pre>
            <ul   v-else-if="block.type === 'ul'" class="b-ul">
              <li v-for="(item, j) in block.items" :key="j" v-html="hlText(item)"></li>
            </ul>
            <div  v-else-if="block.type === 'callout'" :class="['b-callout', block.variant || 'info']" v-html="hlText(block.text)"></div>
            <div  v-else-if="block.type === 'tools'" class="b-tools">
              <span class="tools-label">Tools:</span>
              <span v-for="t in block.items" :key="t" class="tool-tag" v-html="hlText(t)"></span>
            </div>
          </template>
        </div>

        <div class="section-nav">
          <button v-if="prevSection" class="snav-btn" @click="activeSection = prevSection.id">
            ← {{ prevSection.label }}
          </button>
          <button v-if="nextSection" class="snav-btn snav-next" @click="activeSection = nextSection.id">
            {{ nextSection.label }} →
          </button>
        </div>
      </article>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const activeSection = ref(null)
const searchQuery = ref('')
const searchFocused = ref(false)
const selectedSuggestion = ref(-1)
const searchInputEl = ref(null)
const openWelcomeCats = ref(new Set())
const bbWelcomeOpen = ref(false)

const categories = [
  {
    id: 'recon', label: 'Reconnaissance', icon: '◎',
    items: [
      { id: 'subdomain-enum',      label: 'Subdomain Enumeration' },
      { id: 'dns-resolution',      label: 'DNS Resolution' },
      { id: 'http-probing',        label: 'HTTP Probing' },
      { id: 'screenshotting',      label: 'Screenshotting' },
      { id: 'content-discovery',   label: 'Content Discovery' },
      { id: 'parameter-discovery', label: 'Parameter Discovery' },
      { id: 'archived-urls',       label: 'Archived URLs' },
      { id: 'filtering-urls',      label: 'Filtering URLs' },
      { id: 'crawling',            label: 'Crawling & Spidering' },
      { id: 'asn-enum',            label: 'ASN & IP Ranges' },
      { id: 'cloud-enum',          label: 'Cloud Assets' },
      { id: 'fingerprinting',      label: 'Fingerprinting' },
    ]
  },
  {
    id: 'attack-surface', label: 'Attack Surface Mapping', icon: '◉',
    items: [
      { id: 'js-analysis', label: 'JS File Analysis' },
    ]
  },
  {
    id: 'vuln-testing', label: 'Vulnerability Testing', icon: '◈',
    items: [
      { id: 'xss',           label: 'XSS' },
      { id: 'sqli',          label: 'SQL Injection' },
      { id: 'ssrf',          label: 'SSRF' },
      { id: 'idor',          label: 'IDOR' },
      { id: 'open-redirect', label: 'Open Redirect' },
      { id: 'file-upload',   label: 'File Upload' },
      { id: 'cors',          label: 'CORS Misconfiguration' },
      { id: 'lfi',           label: 'LFI' },
    ]
  },
  {
    id: 'advanced', label: 'Advanced Techniques', icon: '◇',
    items: [
      { id: 'ssrf-portscan',     label: 'SSRF → Port Scanning' },
      { id: 'host-header',       label: 'Host Header Injection' },
      { id: 'cache-poisoning',   label: 'Cache Poisoning' },
      { id: 'xss-airixss',       label: 'Automated XSS (airixss)' },
      { id: 'origin-cloudflare', label: 'Origin IP via Cloudflare' },
    ]
  },
  {
    id: 'reporting', label: 'Reporting', icon: '◻',
    items: [
      { id: 'document-findings', label: 'Document Findings' },
      { id: 'prioritize-impact', label: 'Prioritize by Impact' },
      { id: 'submit-report',     label: 'Submit Report' },
    ]
  },
]

const sections = {
  'subdomain-enum': {
    title: 'Subdomain Enumeration',
    content: [
      { type: 'callout', variant: 'info', text: 'Subdomain enumeration has two phases: passive and active. Combine results from all tools and deduplicate before proceeding.' },
      { type: 'h2', text: 'Passive Enumeration' },
      { type: 'p', text: 'Passive enumeration queries public sources without touching the target directly. Combine multiple tools to maximize coverage.' },
      { type: 'tools', items: ['Subfinder', 'Findomain', 'Amass', 'Assetfinder', 'Sublist3r'] },
      { type: 'code', text: `subfinder -d target.com -all -recursive -t 200 -silent -o subfinder-recursive.txt` },
      { type: 'code', text: `findomain --quiet -t target.com | tee findomain.txt` },
      { type: 'code', text: `amass enum -passive -d target.com -o amass.txt` },
      { type: 'code', text: `assetfinder -subs-only target.com | tee assetfinder.txt` },
      { type: 'code', text: `curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value' | sed 's/\\*\\.//g' > crtsh.txt` },
      { type: 'h2', text: 'Active Enumeration' },
      { type: 'p', text: 'Active enumeration bruteforces subdomains using wordlists. This generates traffic towards the target — use only within authorized scopes.' },
      { type: 'tools', items: ['Subbrute', 'MassDNS', 'FFUF', 'DNSX'] },
      { type: 'code', text: `python3 subbrute.py target.com -w wordlist.txt -o brute_subs.txt` },
      { type: 'code', text: `./massdns/scripts/subbrute.py target.com /usr/share/wordlists/2m-subdomains.txt \\
  | massdns -r resolvers.txt -t A -o S -w target.com.txt` },
      { type: 'code', text: `ffuf -u https://target.com -H "Host: FUZZ.target.com" -w subdomains.txt -t 100 -fc 403` },
      { type: 'h2', text: 'Merging Results' },
      { type: 'code', text: `cat *.txt | anew all_subdomains.txt
sort all_subdomains.txt | uniq > subdomains_deduped.txt` },
    ]
  },
  'dns-resolution': {
    title: 'DNS Resolution',
    content: [
      { type: 'p', text: 'After gathering subdomains, validate which are actually live and resolve to real IPs. Dead subdomains waste time in subsequent steps.' },
      { type: 'tools', items: ['dnsx', 'Shuffledns', 'MassDNS', 'Subzy'] },
      { type: 'code', text: `shuffledns -d target.com -list all_subdomains.txt -r resolvers.txt -o live_subs.txt` },
      { type: 'code', text: `dnsx -l all_subdomains.txt -r resolvers.txt -o live_subs.txt` },
      { type: 'h2', text: 'Subdomain Takeover Check' },
      { type: 'p', text: 'If a subdomain resolves but points to an unclaimed service (e.g. an expired S3 bucket or Heroku app), it may be vulnerable to takeover.' },
      { type: 'code', text: `subzy run --targets live_subs.txt` },
      { type: 'h2', text: 'IP Collection & Reverse DNS' },
      { type: 'code', text: `dnsx -l live_subs.txt -a -resp-only -o ips.txt` },
      { type: 'code', text: `dnsx -ptr -l ips.txt -r resolvers.txt | massdns -r resolvers.txt -q -o S -t PTR > reverse_dns.txt` },
    ]
  },
  'http-probing': {
    title: 'HTTP Probing',
    content: [
      { type: 'p', text: 'HTTP probing identifies which resolved subdomains actually serve web content. Ports beyond 80/443 often expose internal panels, APIs, or staging environments.' },
      { type: 'tools', items: ['httpx', 'httprobe'] },
      { type: 'code', text: `httpx -l live_subs.txt -title -sc -location \\
  -p 80,443,8000,8080,8443 -td -cl -probe -o httpx_output.txt` },
      { type: 'code', text: `cat httpx_output.txt | grep -v "FAILED" | awk '{print $1}' | tee probed_domains.txt` },
      { type: 'h2', text: 'Extended Port Scan' },
      { type: 'code', text: `cat subdomains.txt | httpx -l subdomains.txt -ports 80,8080,443,8000,8888 -threads 200` },
      { type: 'callout', variant: 'warn', text: 'Flag interesting responses (401, 403, 302) — they often indicate protected endpoints worth revisiting after authentication.' },
    ]
  },
  'screenshotting': {
    title: 'Screenshotting Web Services',
    content: [
      { type: 'p', text: 'Visual screenshots allow rapid triage of hundreds of subdomains without visiting each manually. Useful to spot login panels, exposed admin interfaces, and staging environments.' },
      { type: 'tools', items: ['Gowitness', 'Aquatone', 'EyeWitness'] },
      { type: 'code', text: `gowitness scan file -f probed_domains.txt --threads 10 \\
  --screenshot-path screenshots/ --write-db` },
      { type: 'code', text: `cat web_servers.txt | aquatone -out screenshots/` },
    ]
  },
  'content-discovery': {
    title: 'Content Discovery',
    content: [
      { type: 'p', text: 'Bruteforce directories and files to reveal hidden endpoints, backup files, admin panels, and configuration files not linked from the main application.' },
      { type: 'tools', items: ['FFUF', 'Dirsearch', 'Gobuster', 'Feroxbuster'] },
      { type: 'h2', text: 'Dirsearch' },
      { type: 'code', text: `dirsearch -w /usr/share/wordlists/custom.txt --full-url --random-agent \\
  -x 404,400 -e php,html,js,json,ini -u https://target.com/` },
      { type: 'h2', text: 'Feroxbuster (bulk targets)' },
      { type: 'code', text: `cat probed_domains.txt | feroxbuster --stdin -s 200 \\
  --no-recursion -k --random-agent --no-state -r -W 0 \\
  -w /usr/share/wordlists/custom.txt` },
      { type: 'h2', text: 'FFUF' },
      { type: 'code', text: `ffuf -w /usr/share/wordlists/custom.txt -t 75 -ac \\
  -mc 200,405,401,415,302,301 -u https://target.com/FUZZ` },
      { type: 'h2', text: 'Gobuster (xargs bulk)' },
      { type: 'code', text: `xargs -a probed_domains.txt -I@ sh -c \\
  'gobuster dir -u "@" --no-error -f -q -k -e \\
   --random-agent -w /usr/share/wordlists/custom.txt'` },
      { type: 'callout', variant: 'info', text: 'Pay special attention to .bak, .old, .config, .sql, .env extensions — they frequently contain credentials or source code.' },
    ]
  },
  'parameter-discovery': {
    title: 'Parameter Discovery',
    content: [
      { type: 'p', text: 'Hidden parameters in endpoints are a primary source of injection vulnerabilities. Many endpoints accept undocumented parameters that alter application behaviour.' },
      { type: 'tools', items: ['Arjun', 'FFUF', 'Paramspider'] },
      { type: 'code', text: `arjun -u "https://target.com" -m get --stable` },
      { type: 'code', text: `ffuf -u https://target.com/page.php?FUZZ=test -w param_wordlist.txt` },
      { type: 'code', text: `paramspider -d target.com --subs` },
    ]
  },
  'archived-urls': {
    title: 'Archived URLs',
    content: [
      { type: 'p', text: 'Historical web archives expose endpoints that have been removed or hidden but may still be active. Old API endpoints, debug parameters, and legacy paths are common finds.' },
      { type: 'tools', items: ['GAU', 'Waybackurls', 'Katana'] },
      { type: 'code', text: `gau target.com | anew gau_urls.txt` },
      { type: 'code', text: `cat subs.txt | gauplus -subs -b png,jpg,gif,jpeg,swf,woff,svg -o allUrls.txt
cat allUrls.txt | httpx -mc 200,403 -o live_urls.txt` },
      { type: 'code', text: `waybackurls target.com | anew wayback_urls.txt` },
      { type: 'code', text: `katana -passive -pss waybackarchive,commoncrawl,alienvault \\
  -f qurl -u target.com | anew katana_urls.txt` },
    ]
  },
  'filtering-urls': {
    title: 'Filtering Interesting URLs',
    content: [
      { type: 'p', text: 'After collecting thousands of URLs, use pattern-based filtering to extract candidates for specific vulnerability classes. GF provides pre-built patterns for common vulnerabilities.' },
      { type: 'tools', items: ['GF (grep-friendly)'] },
      { type: 'code', text: `cat gau_urls.txt | gf xss | anew xss_candidates.txt` },
      { type: 'code', text: `cat gau_urls.txt | gf sqli | anew sqli_candidates.txt` },
      { type: 'ul', items: [
        '<code>gf xss</code> — parameters likely injectable with XSS payloads',
        '<code>gf sqli</code> — parameters likely injectable with SQL payloads',
        '<code>gf ssrf</code> — parameters taking URLs (potential SSRF)',
        '<code>gf redirect</code> — potential open redirect parameters',
        '<code>gf lfi</code> — file path parameters',
      ]},
    ]
  },
  'crawling': {
    title: 'Crawling & Spidering',
    content: [
      { type: 'p', text: 'Active crawling follows links and JavaScript to enumerate endpoints that passive methods miss. Particularly effective against SPAs and dynamically rendered applications.' },
      { type: 'tools', items: ['Katana', 'Gospider', 'Hakrawler'] },
      { type: 'code', text: `katana -list probed_domains.txt -silent -o katana_crawl.txt` },
      { type: 'code', text: `gospider -s https://target.com -d 1 -o gospider_crawl.txt` },
    ]
  },
  'asn-enum': {
    title: 'ASN & IP Range Enumeration',
    content: [
      { type: 'p', text: 'Identify the full IP range owned by the target organization. ASN enumeration reveals assets that may not be covered by DNS, such as internal services exposed to the internet.' },
      { type: 'tools', items: ['Amass', 'Censys', 'Shodan', 'Netcraft'] },
      { type: 'code', text: `amass intel -asn <ASN_NUMBER> -o asn_targets.txt` },
      { type: 'callout', variant: 'info', text: 'Cross-reference results with Shodan and Censys to find open ports and services on IP ranges not covered by subdomain enumeration.' },
    ]
  },
  'cloud-enum': {
    title: 'Cloud Asset Enumeration',
    content: [
      { type: 'p', text: 'Public cloud storage buckets (S3, GCS, Azure Blob) are a recurring source of sensitive data exposure. Many organizations leave buckets publicly readable or writable.' },
      { type: 'tools', items: ['cloud_enum', 'S3Scanner'] },
      { type: 'code', text: `cloud_enum -k target.com` },
      { type: 'ul', items: [
        'Check for public read/write access',
        'Look for credentials, config files, backups, source code',
        'Test bucket name permutations: <code>target-backup</code>, <code>target-dev</code>, <code>target-staging</code>',
      ]},
    ]
  },
  'fingerprinting': {
    title: 'Fingerprinting Web Technologies',
    content: [
      { type: 'p', text: 'Identifying the technology stack (CMS, frameworks, servers, libraries) allows targeted attack planning based on known vulnerabilities for specific versions.' },
      { type: 'tools', items: ['Wappalyzer', 'WhatWeb'] },
      { type: 'code', text: `whatweb target.com` },
      { type: 'ul', items: [
        'Note CMS versions (WordPress, Drupal, Joomla)',
        'Identify frontend frameworks (React, Angular, Vue)',
        'Check server banners: <code>X-Powered-By</code>, <code>Server</code> headers',
        'Look for version disclosures in JS files and HTML comments',
      ]},
    ]
  },
  'js-analysis': {
    title: 'JS File Analysis',
    content: [
      { type: 'callout', variant: 'warn', text: 'JavaScript files frequently expose API keys, hardcoded credentials, internal endpoints, and business logic not documented anywhere else.' },
      { type: 'tools', items: ['LinkFinder', 'subjs', 'SecretFinder', 'Katana'] },
      { type: 'h2', text: 'Endpoint Extraction' },
      { type: 'code', text: `python3 linkfinder.py -i https://target.com/app.js -o cli` },
      { type: 'code', text: `subjs -i https://target.com | anew js_endpoints.txt` },
      { type: 'code', text: `katana -list probed_domains.txt -jc | grep "\\.js"` },
      { type: 'h2', text: 'Secret Scanning' },
      { type: 'code', text: `cat jsfiles.txt | while read url; do
  python3 SecretFinder.py -i $url -o cli >> secrets.txt
done` },
      { type: 'ul', items: [
        'API keys and tokens',
        'Hardcoded credentials',
        'Internal domain names and endpoints',
        'AWS/GCP/Azure credentials',
        'Private keys (search for <code>-----BEGIN</code>)',
      ]},
    ]
  },
  'xss': {
    title: 'XSS (Cross-Site Scripting)',
    content: [
      { type: 'p', text: 'XSS occurs when user-supplied input is reflected or stored in a page without proper sanitization, allowing JavaScript execution in a victim\'s browser context.' },
      { type: 'tools', items: ['KXSS', 'Dalfox', 'XSStrike', 'Burp Suite'] },
      { type: 'h2', text: 'Reflected XSS Discovery' },
      { type: 'code', text: `cat xss_candidates.txt | kxss | grep "\" ' < >" | tee kxss_results.txt` },
      { type: 'code', text: `dalfox url "https://target.com/?q=search" -o dalfox_xss.txt` },
      { type: 'h2', text: 'Manual Testing Tips' },
      { type: 'ul', items: [
        'Test every input: URL params, POST body, HTTP headers (<code>Referer</code>, <code>User-Agent</code>)',
        'Check if output is reflected in HTML body, JS context, or tag attributes separately',
        'Try context-breaking payloads: <code>&lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;</code>',
        'Test for DOM-based XSS: check <code>document.location</code>, <code>innerHTML</code>, eval sinks',
        'Look for CSP misconfigurations that allow bypass',
      ]},
    ]
  },
  'sqli': {
    title: 'SQL Injection',
    content: [
      { type: 'p', text: 'SQL injection allows attackers to manipulate database queries, potentially leading to authentication bypass, data exfiltration, and in some cases remote code execution.' },
      { type: 'tools', items: ['SQLMap', 'ghauri', 'Burp Suite'] },
      { type: 'code', text: `sqlmap -u "https://target.com/product.php?id=1" --dbs` },
      { type: 'code', text: `ghauri -u 'https://target.com/page?id=1*' --batch --flush-session` },
      { type: 'h2', text: 'Testing POST Parameters' },
      { type: 'code', text: `ghauri -u 'https://target.com/login' --data "user=admin*&pass=test" --batch` },
      { type: 'ul', items: [
        'Use <code>*</code> to mark the injection point in ghauri',
        'Check for blind SQLi: time-based (<code>SLEEP</code>) and boolean-based',
        'Test JSON and XML bodies — often overlooked injection points',
        'Check <code>ORDER BY</code> parameters for SELECT injection',
        'Try <code>\'</code>, <code>"</code>, <code>\\\\</code> to detect quote handling',
      ]},
    ]
  },
  'ssrf': {
    title: 'SSRF (Server-Side Request Forgery)',
    content: [
      { type: 'p', text: 'SSRF tricks the server into making HTTP requests to attacker-controlled or internal destinations, potentially exposing cloud metadata, internal services, and credentials.' },
      { type: 'tools', items: ['Gopherus', 'SSRFMap', 'Burp Collaborator', 'interactsh'] },
      { type: 'h2', text: 'Common Injection Points' },
      { type: 'ul', items: [
        'URL parameters: <code>url=</code>, <code>src=</code>, <code>href=</code>, <code>path=</code>, <code>dest=</code>',
        'Webhook endpoints',
        'File import / PDF generation features',
        'Image upload by URL',
        'XML with external entities (XXE → SSRF)',
      ]},
      { type: 'h2', text: 'Cloud Metadata Targets' },
      { type: 'ul', items: [
        'AWS: <code>http://169.254.169.254/latest/meta-data/</code>',
        'GCP: <code>http://metadata.google.internal/computeMetadata/v1/</code>',
        'Azure: <code>http://169.254.169.254/metadata/instance?api-version=2021-02-01</code>',
      ]},
      { type: 'callout', variant: 'warn', text: 'Always use an out-of-band interaction server (Burp Collaborator, interactsh) to detect blind SSRF where the response is not directly reflected.' },
    ]
  },
  'idor': {
    title: 'IDOR (Insecure Direct Object Reference)',
    content: [
      { type: 'p', text: 'IDOR occurs when an application uses user-controllable input to access objects directly without performing proper authorization checks.' },
      { type: 'tools', items: ['Burp Suite', 'Postman'] },
      { type: 'h2', text: 'Testing Approach' },
      { type: 'ul', items: [
        'Create two accounts (A and B). Perform actions as A, intercept requests, substitute A\'s IDs with B\'s',
        'Test numeric IDs: increment/decrement user IDs, order IDs, document IDs',
        'Test GUIDs: UUID patterns — sometimes predictable or disclosed elsewhere',
        'Check indirect references: username in path, slug in query param',
        'Test all HTTP methods: GET, POST, PUT, DELETE, PATCH on object endpoints',
        'Test API list endpoints for missing authorization: <code>/api/v1/users</code>',
      ]},
      { type: 'callout', variant: 'info', text: 'IDOR bugs are often found in export/download functions, PDF generation, and email notification endpoints — functionality that operates in the background.' },
    ]
  },
  'open-redirect': {
    title: 'Open Redirect',
    content: [
      { type: 'p', text: 'Open redirects allow attackers to redirect users to arbitrary external URLs, enabling phishing and assisting in OAuth token theft.' },
      { type: 'h2', text: 'Common Parameter Names' },
      { type: 'ul', items: [
        '<code>?redirect=</code>, <code>?url=</code>, <code>?next=</code>, <code>?return=</code>, <code>?returnTo=</code>',
        '<code>?continue=</code>, <code>?destination=</code>, <code>?go=</code>',
      ]},
      { type: 'h2', text: 'Bypass Techniques' },
      { type: 'ul', items: [
        '<code>https://target.com//evil.com</code>',
        '<code>https://target.com/%2F%2Fevil.com</code>',
        '<code>https://target.com/redirect?url=https://target.com@evil.com</code>',
        'Whitelist bypass: <code>evil.com?target.com</code> or <code>target.com.evil.com</code>',
      ]},
    ]
  },
  'file-upload': {
    title: 'File Upload Vulnerabilities',
    content: [
      { type: 'p', text: 'Insecure file upload functionality can lead to webshell upload and remote code execution when the server executes uploaded files.' },
      { type: 'h2', text: 'Bypass Techniques' },
      { type: 'ul', items: [
        'Extension bypass: <code>.php</code> → <code>.pHp</code>, <code>.php5</code>, <code>.phtml</code>, <code>.php.jpg</code>',
        'MIME type spoofing: change <code>Content-Type</code> to <code>image/jpeg</code> with PHP payload',
        'Magic bytes: prepend valid image bytes (<code>GIF89a</code>) before PHP code',
        'Null byte injection: <code>file.php%00.jpg</code>',
        'Double extension: <code>shell.jpg.php</code>',
        'Archive extraction: malicious zip with path traversal (<code>../shell.php</code>)',
      ]},
      { type: 'callout', variant: 'warn', text: 'Even without code execution, uploads can lead to stored XSS via SVG with script tags, SSRF, XXE, or path traversal via zip archives.' },
    ]
  },
  'cors': {
    title: 'CORS Misconfiguration',
    content: [
      { type: 'p', text: 'CORS misconfigurations allow malicious origins to make credentialed cross-origin requests, potentially leading to session hijacking and sensitive data theft.' },
      { type: 'tools', items: ['Corsy', 'Burp Suite'] },
      { type: 'h2', text: 'Common Misconfigurations' },
      { type: 'ul', items: [
        'Origin reflection: server mirrors whatever origin the request sends',
        'Null origin allowed: <code>Access-Control-Allow-Origin: null</code>',
        'Subdomain wildcard: exploitable via XSS on any subdomain',
        'Prefix/suffix match errors: <code>evil-target.com</code> or <code>target.com.evil.com</code> accepted',
      ]},
      { type: 'code', text: `corsy -i probed_domains.txt -t 10 --headers "Cookie: session=value"` },
    ]
  },
  'lfi': {
    title: 'LFI (Local File Inclusion)',
    content: [
      { type: 'p', text: 'LFI allows reading arbitrary files from the server filesystem by manipulating file path parameters. Can escalate to RCE via log poisoning or PHP wrappers.' },
      { type: 'tools', items: ['dotdotpwn', 'Burp Suite'] },
      { type: 'h2', text: 'Detection Oneliner' },
      { type: 'code', text: `cat urls.txt | qsreplace "/etc/passwd" | while read url; do
  curl -silent "$url" | grep "root:x:" && echo "VULNERABLE: $url"
done` },
      { type: 'h2', text: 'Common Payloads' },
      { type: 'ul', items: [
        '<code>../../../../etc/passwd</code>',
        '<code>....//....//....//etc/passwd</code> (filter bypass)',
        '<code>%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd</code> (URL encoding)',
        '<code>php://filter/convert.base64-encode/resource=index.php</code>',
        '<code>/proc/self/environ</code> for environment variables',
      ]},
    ]
  },
  'ssrf-portscan': {
    title: 'SSRF → Internal Port Scanning',
    content: [
      { type: 'p', text: 'When SSRF is confirmed, pivot to enumerate internal network services that are not externally accessible.' },
      { type: 'code', text: `# Bruteforce internal ports via SSRF endpoint
ffuf -u "https://target.com/fetch?url=http://127.0.0.1:FUZZ" \\
  -w ports.txt -fs <baseline_response_size>` },
      { type: 'ul', items: [
        'Enumerate <code>127.0.0.1</code> and <code>169.254.169.254</code>',
        'Target internal RFC1918 ranges: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>',
        'Look for Elasticsearch (9200), Redis (6379), Memcached (11211)',
        'Use protocol switching: <code>gopher://</code>, <code>dict://</code>, <code>file://</code>',
      ]},
    ]
  },
  'host-header': {
    title: 'Host Header Injection',
    content: [
      { type: 'p', text: 'Manipulating the HTTP Host header can trigger SSRF-like behavior, bypass access controls, poison web caches, or generate password reset links pointing to attacker-controlled domains.' },
      { type: 'ul', items: [
        'Try <code>X-Forwarded-Host: evil.com</code> in addition to the Host header itself',
        'Test absolute URI: <code>GET http://evil.com/ HTTP/1.1</code> with <code>Host: target.com</code>',
        'Password reset poisoning: if the reset link uses the Host header, inject <code>Host: evil.com</code>',
        'Cache poisoning: malicious Host header stored and served to other users',
        'Routing-based SSRF: some reverse proxies route requests based on Host header value',
      ]},
    ]
  },
  'cache-poisoning': {
    title: 'Cache Poisoning',
    content: [
      { type: 'p', text: 'Cache poisoning stores a malicious response in a shared cache so it is served to legitimate users. Impact ranges from stored XSS to credential theft at scale.' },
      { type: 'h2', text: 'Unkeyed Input Discovery' },
      { type: 'p', text: 'Identify headers and parameters that influence the response but are excluded from the cache key. These are the injection vectors.' },
      { type: 'ul', items: [
        'Headers: <code>X-Forwarded-Host</code>, <code>X-Forwarded-Scheme</code>, <code>X-Original-URL</code>',
        'Parameters: fat GET parameters, UTM params (<code>utm_source</code>)',
        'Use Param Miner (Burp extension) to automate discovery',
      ]},
      { type: 'code', text: `GET /?cb=1 HTTP/1.1\nHost: target.com\nX-Forwarded-Host: ">\x3cscript\x3ealert(1)\x3c/script\x3e` },
    ]
  },
  'xss-airixss': {
    title: 'Automated XSS (airixss)',
    content: [
      { type: 'p', text: 'Combine archive URL collection, parameter deduplication, payload injection, and automated validation into a single pipeline.' },
      { type: 'code', text: 'waybackurls target.com \\\n  | urldedupe -qs \\\n  | qsreplace "\x3cscript\x3econfirm(1)\x3c/script\x3e" \\\n  | airixss -payload "confirm(1)" \\\n  | egrep -v \'Not\'' },
      { type: 'ul', items: [
        '<code>waybackurls</code> — collect historical URLs',
        '<code>urldedupe -qs</code> — deduplicate by query string signature',
        '<code>qsreplace</code> — replace all parameter values with the XSS payload',
        '<code>airixss</code> — test each URL and validate execution',
      ]},
    ]
  },
  'origin-cloudflare': {
    title: 'Origin IP Discovery via Cloudflare',
    content: [
      { type: 'p', text: 'Many targets hide their origin server behind Cloudflare. Connecting directly to the origin bypasses WAF controls and allows testing without interference.' },
      { type: 'h2', text: 'Favicon Hash Method' },
      { type: 'ul', items: [
        'Retrieve the favicon URL from the target\'s HTML source',
        'Generate the Shodan hash with the favicon hash tool',
        'Shodan search: <code>http.favicon.hash:[hash]</code>',
        'Censys: <code>services.http.response.favicons.md5_hash:[hash]</code>',
      ]},
      { type: 'h2', text: 'Other Techniques' },
      { type: 'ul', items: [
        'Historical DNS records: SecurityTrails, PassiveTotal',
        'Certificate transparency: <code>crt.sh</code> — origin IP may appear in SANs',
        'Email headers: MX records and outbound email headers sometimes reveal origin',
        'Exposed diagnostic pages: <code>phpinfo()</code>, error pages leaking server IP',
      ]},
    ]
  },
  'document-findings': {
    title: 'Document Your Findings',
    content: [
      { type: 'p', text: 'A well-documented report is as important as finding the vulnerability. Insufficient documentation leads to reports being closed as informational or rejected outright.' },
      { type: 'h2', text: 'Required Elements' },
      { type: 'ul', items: [
        '<strong>Title:</strong> concise, descriptive — avoid vague names like "XSS found"',
        '<strong>Severity:</strong> justified CVSS score with vector breakdown',
        '<strong>Affected URL:</strong> exact URL and HTTP method',
        '<strong>Reproduction steps:</strong> numbered, reproducible from a clean session',
        '<strong>Impact:</strong> concrete worst-case business impact, not theoretical',
        '<strong>Proof of concept:</strong> curl command, Burp request, or screen recording',
        '<strong>Remediation:</strong> specific fix, not just "sanitize input"',
      ]},
    ]
  },
  'prioritize-impact': {
    title: 'Prioritize by Impact',
    content: [
      { type: 'p', text: 'Programs prioritize reports by actual impact on their assets. Demonstrating real impact is the difference between a critical payout and a duplicate mark.' },
      { type: 'h2', text: 'High-Impact Classes' },
      { type: 'ul', items: [
        'RCE / SSTI leading to code execution on backend',
        'SQLi with sensitive data extraction (PII, credentials)',
        'Authentication bypass — admin access, account takeover',
        'SSRF reaching cloud metadata with credential exposure',
        'Stored XSS on high-traffic authenticated pages',
        'IDOR with access to PII or financial data at scale',
      ]},
      { type: 'callout', variant: 'info', text: 'Use CVSS 3.1 as a baseline but contextualize: a P4 bug on a critical asset is worth more than a theoretical P2 on an isolated endpoint.' },
    ]
  },
  'submit-report': {
    title: 'Submit a Clear Report',
    content: [
      { type: 'p', text: 'Reports submitted through bug bounty platforms require clarity, completeness, and professionalism. Triagers handle hundreds of reports — make yours easy to validate.' },
      { type: 'h2', text: 'Platforms' },
      { type: 'ul', items: [
        '<strong>HackerOne</strong> — largest platform, structured report format',
        '<strong>Bugcrowd</strong> — good variety of private programs',
        '<strong>Intigriti</strong> — strong European presence',
        '<strong>Direct VDP</strong> — security.txt or responsible disclosure policy',
      ]},
      { type: 'h2', text: 'Report Checklist' },
      { type: 'ul', items: [
        'Title clearly states vulnerability class and affected component',
        'Severity is justified, not inflated',
        'Reproduction steps work on a clean session',
        'Screenshots or video for every step',
        'HTTP requests/responses pasted as text, not only screenshots',
        'Remediation suggestion is actionable and specific',
      ]},
      { type: 'callout', variant: 'warn', text: 'Never disclose vulnerabilities publicly before the program\'s disclosure deadline. Premature disclosure can disqualify your bounty and may have legal consequences.' },
    ]
  },
}

const allItems = categories.flatMap(cat => cat.items)

function selectSection(id) {
  activeSection.value = id
  document.querySelector('.content-area')?.scrollTo(0, 0)
}

function openCategory(cat) {
  selectSection(cat.items[0].id)
}

function toggleWelcomeCat(id) {
  if (openWelcomeCats.value.has(id)) {
    openWelcomeCats.value.delete(id)
  } else {
    openWelcomeCats.value.add(id)
  }
}

const activeSectionData = computed(() => {
  if (!activeSection.value) return null
  return sections[activeSection.value] ?? null
})

const activeCategoryLabel = computed(() => {
  for (const cat of categories) {
    if (cat.items.some(i => i.id === activeSection.value)) return cat.label
  }
  return ''
})

function _escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function _hlRx() {
  const q = searchQuery.value.trim()
  if (!q) return null
  return new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
}
function hlText(text) {
  if (!text) return text ?? ''
  const rx = _hlRx()
  if (!rx) return text
  return text.replace(rx, '<mark class="hl">$1</mark>')
}
function hlCode(text) {
  const safe = _escHtml(text ?? '')
  const rx = _hlRx()
  if (!rx) return safe
  return safe.replace(rx, '<mark class="hl">$1</mark>')
}

// ── Search suggestions ────────────────────────────
const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (q.length < 1) return []
  const out = []
  for (const cat of categories) {
    for (const item of cat.items) {
      const titleMatch = item.label.toLowerCase().includes(q)
      const s = sections[item.id]
      let excerpt = null
      let contentMatch = false
      if (s) {
        for (const block of s.content) {
          let raw = ''
          if (block.text) raw = block.text.replace(/<[^>]+>/g, '')
          else if (block.items) raw = block.items.filter(i => typeof i === 'string').join(' ').replace(/<[^>]+>/g, '')
          if (raw.toLowerCase().includes(q)) {
            contentMatch = true
            const idx = raw.toLowerCase().indexOf(q)
            const a = Math.max(0, idx - 28)
            const b = Math.min(raw.length, idx + q.length + 52)
            excerpt = (a > 0 ? '…' : '') + raw.slice(a, b).trim() + (b < raw.length ? '…' : '')
            break
          }
        }
      }
      if (titleMatch || contentMatch) {
        out.push({ id: item.id, label: item.label, catLabel: cat.label, catIcon: cat.icon, excerpt: titleMatch ? null : excerpt })
      }
    }
  }
  return out.slice(0, 9)
})

watch(searchQuery, () => { selectedSuggestion.value = -1 })

function goToResult(r) {
  selectSection(r.id)
  searchQuery.value = ''
  searchFocused.value = false
  selectedSuggestion.value = -1
}
function clearSearch() {
  searchQuery.value = ''
  selectedSuggestion.value = -1
  searchInputEl.value?.focus()
}
function onSearchBlur() {
  setTimeout(() => { searchFocused.value = false }, 160)
}
function onSearchKeydown(e) {
  const len = searchResults.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedSuggestion.value = Math.min(selectedSuggestion.value + 1, len - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedSuggestion.value = Math.max(selectedSuggestion.value - 1, -1)
  } else if (e.key === 'Enter' && selectedSuggestion.value >= 0) {
    goToResult(searchResults.value[selectedSuggestion.value])
  } else if (e.key === 'Escape') {
    clearSearch()
    searchFocused.value = false
  }
}

const currentIndex = computed(() => allItems.findIndex(i => i.id === activeSection.value))
const prevSection = computed(() => currentIndex.value > 0 ? allItems[currentIndex.value - 1] : null)
const nextSection = computed(() => currentIndex.value < allItems.length - 1 ? allItems[currentIndex.value + 1] : null)
</script>

<style scoped>
/* ── Root ────────────────────────────────────────── */
.notes-root {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  background: #000;
  font-family: 'JetBrains Mono', monospace;
  color: #ccc;
}

/* ── Search header ───────────────────────────────── */
.search-header {
  flex-shrink: 0;
  background: #000;
  border-bottom: 1px solid #ff003c0d;
  padding: .9rem 2rem;
  z-index: 20;
}
.search-container {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}
.search-wrap {
  display: flex; align-items: center; gap: .6rem;
  background: #07070a; border: 1px solid #ffffff0d;
  border-radius: 4px; padding: .7rem 1rem;
  transition: border-color .18s;
}
.search-wrap.focused { border-color: #ff003c44; }
.search-icon {
  width: 14px; height: 14px; color: #2a2a2a;
  flex-shrink: 0; transition: color .15s;
}
.search-wrap.focused .search-icon { color: #ff003c55; }
.search-input {
  flex: 1; background: transparent; border: none; outline: none;
  font-family: inherit; font-size: .82rem; color: #888; caret-color: #ff003c;
}
.search-input::placeholder { color: #1e1e1e; }
.search-kbd {
  font-size: .58rem; padding: 2px 6px;
  border: 1px solid #181818; border-radius: 3px;
  color: #1e1e1e; flex-shrink: 0; font-family: inherit;
}
.search-clear {
  background: transparent; border: none; cursor: pointer;
  color: #2e2e2e; font-size: .7rem; padding: 1px 4px;
  flex-shrink: 0; font-family: inherit; transition: color .12s;
}
.search-clear:hover { color: #ff003c; }

/* ── Suggestions ─────────────────────────────────── */
.suggestions {
  position: absolute;
  top: calc(100% + 2px);
  left: 0; right: 0;
  background: #06060a;
  border: 1px solid #ff003c2a;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 12px 32px #000000bb;
}
.sug-item {
  display: flex; align-items: flex-start; gap: .75rem;
  width: 100%; background: transparent; border: none;
  border-bottom: 1px solid #ffffff05;
  padding: .75rem 1rem; cursor: pointer;
  font-family: inherit; text-align: left;
  transition: background .1s;
}
.sug-item:last-child { border-bottom: none; }
.sug-item:hover, .sug-sel { background: #ff003c0a; }
.sug-arrow {
  color: #ff003c44; font-size: .75rem; flex-shrink: 0;
  margin-top: 2px; transition: color .1s;
}
.sug-item:hover .sug-arrow, .sug-sel .sug-arrow { color: #ff003c; }
.sug-body { display: flex; flex-direction: column; gap: .2rem; flex: 1; min-width: 0; }
.sug-label { font-size: .8rem; color: #999; font-weight: 600; }
.sug-meta { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
.sug-cat {
  font-size: .65rem; color: #333;
  letter-spacing: .05em;
}
.sug-excerpt {
  font-size: .68rem; color: #2e2e2e;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 340px;
}
.sug-empty {
  padding: .9rem 1rem; font-size: .78rem; color: #2e2e2e;
}
.sug-empty em { color: #444; font-style: normal; }

/* Suggestions transition */
.sug-enter-active, .sug-leave-active { transition: opacity .12s, transform .12s; }
.sug-enter-from, .sug-leave-to { opacity: 0; transform: translateY(-4px); }

/* ── Search highlight ────────────────────────────── */
.hl {
  background: #ff003c28;
  color: #ff6680;
  border-radius: 2px;
  padding: 0 1px;
  font-style: normal;
}
.b-code .hl {
  background: #ff003c3a;
  color: #ff8899;
}

/* ── Content area ────────────────────────────────── */
.content-area {
  flex: 1; overflow-y: auto;
  scrollbar-width: thin; scrollbar-color: #ff003c18 transparent;
}
.content-area::-webkit-scrollbar { width: 4px; }
.content-area::-webkit-scrollbar-thumb { background: #ff003c18; }

/* Welcome */
.welcome { max-width: 680px; margin: 0 auto; padding: 3.5rem 2.5rem 4rem; }
.welcome-pre   { font-size: .7rem; letter-spacing: .2em; color: #ff003c33; margin-bottom: .5rem; }
.welcome-title { font-size: 2.4rem; font-weight: 900; letter-spacing: .3em; color: #ff003c; margin-bottom: 2.5rem; }

/* ── Graph tree ──────────────────────────── */
.tg-wrap { display: flex; flex-direction: column; }

/* Root node */
.tg-root-node {
  display: flex; align-items: center; gap: .85rem;
  background: #08080d; border: 1px solid #ff003c44;
  border-radius: 3px; padding: .95rem 1.2rem;
  cursor: pointer; font-family: inherit; text-align: left;
  width: 100%; transition: border-color .2s, background .15s;
}
.tg-root-node:hover  { border-color: #ff003c88; background: #0d0d14; }
.tg-root-open        { border-color: #ff003c66 !important; background: #0a0a10 !important; }
.tg-root-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #ff003c; flex-shrink: 0;
  box-shadow: 0 0 6px #ff003c88;
}
.tg-root-label {
  flex: 1; font-size: .88rem; font-weight: 900;
  letter-spacing: .14em; text-transform: uppercase; color: #ff003c;
}
.tg-root-count { font-size: .65rem; color: #333; }
.tg-root-chev { color: #ff003c55; font-size: 1rem; transition: transform .22s, color .15s; }
.tg-root-chev.open { transform: rotate(90deg); color: #ff003c; }

/* L1 branch — vertical trunk from root */
.tg-branch {
  margin-left: 1.6rem;
  padding-left: 1.4rem;
  border-left: 1px solid #ff003c22;
  padding-top: .3rem;
  padding-bottom: .1rem;
}

/* L1 category wrapper — provides relative context for connector */
.tg-cat-wrap { position: relative; margin: .35rem 0; }

/* horizontal stub from trunk to each category node */
.tg-cat-wrap::before {
  content: '';
  position: absolute;
  left: -1.4rem;
  top: 1.15rem;
  width: 1.15rem;
  height: 1px;
  background: #ff003c22;
}

/* L1 Category node */
.tg-cat-node {
  display: flex; align-items: center; gap: .7rem;
  width: 100%; background: #06060a;
  border: 1px solid #ffffff09; border-radius: 2px;
  padding: .7rem 1rem; cursor: pointer;
  font-family: inherit; text-align: left;
  transition: border-color .15s, background .15s;
  position: relative;
}
.tg-cat-node:hover  { border-color: #ff003c33; background: #0c0c12; }
.tg-cat-open        { border-color: #ff003c22 !important; }
.tg-cat-dot {
  width: 6px; height: 6px; border-radius: 50%;
  border: 1px solid #ff003c55; flex-shrink: 0;
  background: transparent; transition: background .15s;
}
.tg-cat-open .tg-cat-dot { background: #ff003c33; }
.tg-cat-icon { font-size: .88rem; flex-shrink: 0; }
.tg-cat-label { flex: 1; font-size: .8rem; font-weight: 700; color: #999; letter-spacing: .03em; }
.tg-cat-count { font-size: .63rem; color: #2a2a2a; }
.tg-cat-chev { color: #333; font-size: .9rem; transition: transform .2s, color .15s; }
.tg-cat-chev.open { transform: rotate(90deg); color: #ff003c88; }

/* L2 items branch */
.tg-items-branch {
  margin-left: 1.4rem;
  padding-left: 1.2rem;
  border-left: 1px solid #ffffff07;
  padding-top: .2rem;
  padding-bottom: .1rem;
}

/* L2 item wrapper — connector stub */
.tg-items-branch > .tg-item-node { position: relative; }
.tg-items-branch > .tg-item-node::before {
  content: '';
  position: absolute;
  left: -1.22rem;
  top: 50%;
  width: .95rem;
  height: 1px;
  background: #ffffff07;
}

/* L2 Item node */
.tg-item-node {
  display: flex; align-items: center; gap: .6rem;
  width: 100%; background: transparent; border: none;
  padding: .38rem .75rem; cursor: pointer;
  font-family: inherit; font-size: .76rem; color: #3e3e3e;
  text-align: left; border-radius: 2px;
  transition: color .12s, background .12s;
}
.tg-item-node:hover { color: #bbb; background: #ffffff04; }
.tg-item-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: #2a2a2a; flex-shrink: 0; transition: background .12s;
}
.tg-item-node:hover .tg-item-dot { background: #ff003c55; }
.tg-item-label { flex: 1; }

/* Graph tree animation */
.tg-enter-active,
.tg-leave-active {
  overflow: hidden;
  transition: max-height .26s ease, opacity .2s ease;
}
.tg-enter-from, .tg-leave-to   { max-height: 0;      opacity: 0; }
.tg-enter-to,   .tg-leave-from { max-height: 1400px; opacity: 1; }

/* Section view */
.section-view { max-width: 820px; margin: 0 auto; padding: 2.5rem 2.5rem 4rem; }

.breadcrumb { font-size: .7rem; color: #333; margin-bottom: 1.5rem; letter-spacing: .05em; }
.bc-root { color: #38bdf866; cursor: pointer; transition: color .15s; }
.bc-root:hover { color: #38bdf8; }
.bc-sep  { color: #222; margin: 0 .3rem; }
.bc-cat  { color: #444; }
.bc-current { color: #666; }

.section-title {
  font-size: 1.5rem; font-weight: 900; color: #fff;
  margin-bottom: 2rem; letter-spacing: .02em;
  border-bottom: 1px solid #ffffff08; padding-bottom: 1rem;
}

/* Content blocks */
.section-body { display: flex; flex-direction: column; gap: 1.25rem; }

.b-h2 {
  font-size: .88rem; font-weight: 900; letter-spacing: .15em;
  text-transform: uppercase; color: #ff003c;
  border-bottom: 1px solid #ff003c1a; padding-bottom: .4rem;
  margin: .75rem 0 0;
}
.b-h3 { font-size: .85rem; font-weight: 700; color: #38bdf8; letter-spacing: .08em; margin: .5rem 0 0; }
.b-p  { font-size: .85rem; color: #888; line-height: 1.9; margin: 0; }
.b-p code { color: #38bdf8; background: #38bdf80d; padding: 1px 5px; border-radius: 2px; font-family: inherit; }
.b-p strong { color: #ccc; }

.b-code {
  background: #08090a; border: 1px solid #38bdf81a;
  border-left: 3px solid #38bdf8; border-radius: 2px;
  padding: 1rem 1.25rem;
  font-family: 'JetBrains Mono', monospace; font-size: .78rem;
  color: #a5f3fc; overflow-x: auto; line-height: 1.7;
  margin: 0; white-space: pre;
}
.b-code code { font-family: inherit; }

.b-ul { padding-left: .5rem; display: flex; flex-direction: column; gap: .5rem; margin: 0; list-style: none; }
.b-ul li { font-size: .83rem; color: #777; line-height: 1.8; display: flex; gap: .5rem; }
.b-ul li::before { content: '▸'; color: #38bdf8; font-size: .72rem; flex-shrink: 0; margin-top: 3px; }
.b-ul li code { color: #38bdf8; background: #38bdf80d; padding: 1px 5px; border-radius: 2px; font-family: inherit; }
.b-ul li strong { color: #aaa; }

.b-callout { padding: .9rem 1.1rem; border-radius: 2px; font-size: .8rem; line-height: 1.8; }
.b-callout.info { background: #38bdf80d; border: 1px solid #38bdf833; color: #38bdf8; }
.b-callout.warn { background: #ff003c0d; border: 1px solid #ff003c44; color: #ff6688; }

.b-tools { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
.tools-label { font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; color: #38bdf866; }
.tool-tag {
  font-size: .68rem; padding: 2px 8px;
  border: 1px solid #38bdf822; color: #38bdf8;
  background: #38bdf808; border-radius: 2px;
}

/* Prev/Next */
.section-nav {
  display: flex; justify-content: space-between;
  margin-top: 3rem; padding-top: 1.5rem;
  border-top: 1px solid #ffffff06;
}
.snav-btn {
  font-family: inherit; font-size: .72rem; letter-spacing: .08em;
  color: #555; background: transparent;
  border: 1px solid #ffffff0a; padding: 8px 14px;
  border-radius: 2px; cursor: pointer;
  transition: all .15s; text-transform: uppercase;
}
.snav-btn:hover { color: #38bdf8; border-color: #38bdf833; }
.snav-next { margin-left: auto; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 768px) {
  .search-header { padding: .75rem 1rem; }
  .section-view, .welcome { padding: 1.5rem 1.25rem 3rem; }
  .welcome-title { font-size: 1.8rem; }
  .sug-excerpt { max-width: 200px; }
}
</style>
