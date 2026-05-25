import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const API_URL       = process.env.SINGPAY_API_URL!;
const CLIENT_ID     = process.env.SINGPAY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SINGPAY_CLIENT_SECRET!;
const WALLET_ID     = process.env.SINGPAY_WALLET_ID!;
const BASE_URL      = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AF2G-";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) code += chars[Math.floor(Math.random() * chars.length)];
    if (i < 2) code += "-";
  }
  return code;
}

function parseAmount(montant: string): number {
  return parseInt(montant.replace(/\./g, ""), 10);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { denomination, formeJuridique, titre, adresse, email, telephone, countryCode, pack, montant } = body;

  if (!denomination || !pack || !montant) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const ref    = generateRef();
  const amount = parseAmount(montant);

  const successUrl = new URL("/congres/succes", BASE_URL);
  successUrl.searchParams.set("nom",     denomination);
  successUrl.searchParams.set("pack",    pack);
  successUrl.searchParams.set("montant", montant);
  successUrl.searchParams.set("ref",     ref);

  const errorUrl = new URL("/congres/echec", BASE_URL);
  errorUrl.searchParams.set("ref", ref);

  // Enregistrement en base avec statut "pending"
  const { error: dbError } = await supabase.from("partenariats").insert({
    reference:      ref,
    denomination,
    forme_juridique: formeJuridique || null,
    titre:          titre          || null,
    adresse:        adresse        || null,
    email:          email          || null,
    telephone:      telephone      || null,
    country_code:   countryCode    || "+241",
    pack,
    montant,
    statut:         "pending",
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  // Appel SingPay
  const payload = {
    portefeuille:     WALLET_ID,
    reference:        ref,
    redirect_success: successUrl.toString(),
    redirect_error:   errorUrl.toString(),
    amount,
    disbursement:     `Partenariat CIG 2026 — Pack ${pack}`,
    logoURL:          `${BASE_URL}/logo.png`,
    isTransfer:       false,
  };

  const singpayRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type":    "application/json",
      "x-client-id":     CLIENT_ID,
      "x-client-secret": CLIENT_SECRET,
      "x-wallet":        WALLET_ID,
    },
    body: JSON.stringify(payload),
  });

  if (!singpayRes.ok) {
    const details = await singpayRes.text();
    console.error("SingPay error:", singpayRes.status, details);
    // Marquer l'enregistrement comme échoué
    await supabase.from("partenariats").update({ statut: "failed" }).eq("reference", ref);
    return NextResponse.json({ error: "Erreur SingPay. Veuillez réessayer.", details }, { status: 502 });
  }

  const data: { link: string; exp: string } = await singpayRes.json();
  return NextResponse.json({ link: data.link, ref });
}
