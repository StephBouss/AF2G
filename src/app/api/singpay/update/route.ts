import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { ref, statut } = await req.json();

  if (!ref || !["success", "failed"].includes(statut)) {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  const { error } = await supabase
    .from("partenariats")
    .update({ statut })
    .eq("reference", ref);

  if (error) {
    console.error("Supabase update error:", error);
    return NextResponse.json({ error: "Mise à jour échouée." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
