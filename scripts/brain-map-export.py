#!/usr/bin/env python3
"""Aggregate-only snapshot of brain for the store map: store names, counts, kind mix,
store-to-store link counts, monthly growth. No titles, bodies, labels, owners or ids.
Usage: brain export --wide -o export.jsonl; brain stores list --json > stores.json; export.py export.jsonl stores.json > brain-map.json"""
import json, sys, collections as C, datetime
AUTO={"lifespan","guard","staleness","retro"}
TPL=("State change","Pane w","ObligationGuard","BehaviorEnforcement","Retired agent handoff","yolo violation")
AGENT_STORES={"robots","handoff","dump","agent","friction","errors"}
AGENT_LABELS={"by:loopback-local","source:mcp","source:relay","source:batch"}
AGENT_USERS={"lane","mayor","gnhf-dream2","brain-unify","relay","Mechanic","Volt"}
REG=sorted((r["name"].replace("_","-") for r in json.load(open(sys.argv[2]))),key=len,reverse=True)
REG0={n.replace("_","-"):n for n in (r["name"] for r in json.load(open(sys.argv[2])))}
def store(i):
    for n in REG:
        if i.startswith(n+"-"): return REG0.get(n,n)
    return i.split("-")[0]
def kind(x):
    L=set(x.get("labels") or []); p=store(x["id"])
    if "og-writeprobe" in L: return "probe"
    if p in AUTO or "auto-captured" in L or "src-startup" in L or x["title"].startswith(TPL): return "procedural"
    if L&AGENT_LABELS or p in AGENT_STORES or x.get("created_by") in AGENT_USERS: return "agent"
    return "unmarked"
cnt=C.defaultdict(lambda:C.Counter()); growth=C.defaultdict(C.Counter); edges=C.Counter(); etype=C.Counter(); total=0; ids={}
rows=[json.loads(l) for l in open(sys.argv[1])]
rows=[x for x in rows if x.get("_type","issue")=="issue" and "id" in x]
for x in rows:
    k=kind(x)
    if k=="probe": continue
    s=store(x["id"]); cnt[s][k]+=1; cnt[s]["total"]+=1; ids[x["id"]]=s
    growth[x["created_at"][:7]][s]+=1
for x in rows:
    if x["id"] not in ids: continue
    for d in x.get("dependencies") or []:
        a=ids[x["id"]]; b=ids.get(d["depends_on_id"])
        if b is None: continue
        edges[tuple(sorted((a,b)))]+=1; etype[d["type"]]+=1
stores=sorted(cnt,key=lambda s:-cnt[s]["total"])
idx={s:i for i,s in enumerate(stores)}
months=sorted(growth); run=C.Counter(); cum=[]
for m in months:
    run.update(growth[m]); cum.append([run[s] for s in stores])
lab=C.Counter()
for x in rows:
    if x["id"] not in ids: continue
    for l in x.get("labels") or []:
        if l.startswith("project:") and ids[x["id"]]!="project": lab[(ids[x["id"]],"project")]+=1
        if l.startswith("resume:") and ids[x["id"]]!="resumes": lab[(ids[x["id"]],"resumes")]+=1
out={"schema":"brain-map/v1","as_of":datetime.date.today().isoformat(),
 "excluded":"write-test probes (og-writeprobe)",
 "kinds":["procedural","agent","unmarked"],
 "stores":[{"name":s,"total":cnt[s]["total"],**{k:cnt[s][k] for k in ("procedural","agent","unmarked")}} for s in stores],
 "links":[[idx[a],idx[b],n] for (a,b),n in edges.most_common()],
 "link_types":dict(etype),
 "label_links":[[idx[a],idx[b],n] for (a,b),n in lab.most_common() if a in idx and b in idx],
 "totals":{"beads":sum(cnt[s]["total"] for s in stores),"stores":len(stores),"links":sum(edges.values()),
           "cross_store_links":sum(n for (a,b),n in edges.items() if a!=b)},
 "growth":{"months":months,"cumulative":cum}}
json.dump(out,sys.stdout,separators=(",",":"))
