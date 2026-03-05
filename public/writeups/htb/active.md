# Active

> **Platform:** HackTheBox &nbsp;·&nbsp; **OS:** Windows &nbsp;·&nbsp; **Difficulty:** Easy &nbsp;·&nbsp; **IP:** `10.10.10.100`

---

## Scanning

Starting with a full Nmap scan against `10.10.10.100` to enumerate open ports and services.

![Nmap scan results](/writeups/htb/active/img1.png)

The scan reveals a **Windows Server 2008 R2 SP1 Domain Controller** for the domain `active.htb`. Key open ports:

- `53` — Microsoft DNS 6.1.7601
- `88` — Kerberos
- `135`, `139`, `445` — RPC / NetBIOS / SMB
- `389`, `3268` — LDAP (Active Directory, Domain: `active.htb`)

## Enumeration

With SMB open, I enumerate accessible shares using `smbclient`. Anonymous login succeeds and reveals several shares — only **Replication** is accessible with READ ONLY permissions.

![SMB share enumeration](/writeups/htb/active/img2.png)

Connecting anonymously to the Replication share and browsing its directory tree.

![Replication share contents](/writeups/htb/active/img3.png)

Following the Group Policy path inside the share, I find **`Groups.xml`** — a Group Policy Preferences file that stores an AES-256 encrypted password (`cpassword`) for the service account `SVC_TGS`.

![Groups.xml and gpp-decrypt](/writeups/htb/active/img4.png)

GPP passwords are encrypted with a hardcoded, **publicly known AES key** (disclosed by Microsoft in MS-GPPREF). Using `gpp-decrypt` to recover the plaintext:

```bash
gpp-decrypt edBSHOwhZLTjt/QS9FeIcJ83mjWA98gw9guKOhJOdcqh+ZGMeXOsQbCpZ3xUjTLfCuNH8pG5aSVYdYw/NglVmQ

GPPstillStandingStrong2k18
```

**Credentials recovered:** `active.htb\SVC_TGS : GPPstillStandingStrong2k18`

With valid credentials, I enumerate domain objects via RID brute-force to list all user accounts.

![Domain user enumeration](/writeups/htb/active/img5.png)

Domain users found: `Administrator`, `Guest`, `krbtgt`, `SVC_TGS`.

![SMB shares and groups with SVC_TGS credentials](/writeups/htb/active/img6.png)

## Exploitation — Kerberoasting

With valid domain credentials I can request Kerberos **TGS tickets** for accounts that have a Service Principal Name (SPN) registered. The `Administrator` account has an SPN — making this a classic **Kerberoasting** scenario.

![GetUserSPNs.py Kerberoasting attack](/writeups/htb/active/img7.png)

```bash
impacket-GetUserSPNs active.htb/SVC_TGS:GPPstillStandingStrong2k18 \
  -dc-ip 10.10.10.100 -request
```

The TGS hash for the `Administrator` account is retrieved. Cracking it offline with `hashcat`:

```bash
hashcat -m 13100 administrator.hash /usr/share/wordlists/rockyou.txt --force
```

![Hashcat cracking the Administrator TGS hash](/writeups/htb/active/img8.png)

**Administrator password cracked:** `Ticketmaster1968`

## Post-Exploitation

With full `Administrator` credentials, authenticating via `impacket-psexec` to obtain a **SYSTEM shell** on the Domain Controller.

```bash
impacket-psexec active.htb/Administrator:Ticketmaster1968@10.10.10.100
```

![PSExec SYSTEM shell on the Domain Controller](/writeups/htb/active/img9.png)

Full domain compromise achieved. Flags retrieved from `Users\SVC_TGS\Desktop\user.txt` and `Users\Administrator\Desktop\root.txt`.

![Root flag](/writeups/htb/active/img10.png)

## References

- [MindPoint Group — Privilege Escalation via Group Policy Preferences](https://www.mindpointgroup.com/blog/privilege-escalation-via-group-policy-preferences-gpp)
- [gpp-decrypt by t0thkr1s](https://github.com/t0thkr1s/gpp-decrypt)
