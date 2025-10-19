import pandas as pd
from pathlib import Path
import json

raw = Path("./raw/support_tickets_data.csv")
out = Path("./processed")
out.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(raw, low_memory=False)

# parse de datas
df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')

# métricas básicas
tickets_por_dia = df.groupby(df['created_at'].dt.date).size().rename("count").reset_index()
tickets_por_dia = tickets_por_dia.rename(columns={"created_at": "date"})
tickets_por_dia['date'] = tickets_por_dia['date'].astype(str)

top_10_types = df['type'].value_counts().head(10).rename_axis('type').reset_index(name='count')

metrics = {
    "tickets_per_day": tickets_por_dia.to_dict(orient='records'),
    "top_types": top_10_types.to_dict(orient='records'),
    "total_tickets": int(df.shape[0])
}

with open(out / "metrics.json", "w", encoding="utf-8") as f:
    json.dump(metrics, f, ensure_ascii=False, indent=2)
