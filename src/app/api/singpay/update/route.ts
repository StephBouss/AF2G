import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const PACK_LABELS: Record<string, string> = {
  BRONZE:              "Bronze",
  "ARGENT / SILVER":   "Argent / Silver",
  "OR / GOLD":         "Or / Gold",
  "PLATINE / PLATINUM":"Platine / Platinum",
  "DIAMANT / DIAMOND": "Diamant / Diamond",
};

const PACK_COLORS: Record<string, string> = {
  BRONZE:              "#e97316",
  "ARGENT / SILVER":   "#94a3b8",
  "OR / GOLD":         "#facc15",
  "PLATINE / PLATINUM":"#a5b4fc",
  "DIAMANT / DIAMOND": "#67e8f9",
};

function buildEmailHtml(params: {
  denomination: string;
  pack: string;
  montant: string;
  reference: string;
  email: string;
}): string {
  const { denomination, pack, montant, reference } = params;
  const packLabel = PACK_LABELS[pack] ?? pack;
  const packColor = PACK_COLORS[pack] ?? "#B8860B";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Billet de Partenariat — Congrès AF2G 2026</title>
</head>
<body style="margin:0;padding:0;background:#0d0904;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0904;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1A1104;border:1px solid rgba(184,134,11,0.3);border-radius:8px;overflow:hidden;">

          <!-- Top gold stripe -->
          <tr>
            <td style="height:5px;background:linear-gradient(to right,#B8860B,#D4AF37);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px;border-bottom:1px solid rgba(184,134,11,0.15);">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#B8860B;">
                Billet de Partenariat Officiel
              </p>
              <h1 style="margin:0;font-size:22px;color:#F5F5F5;font-weight:bold;line-height:1.3;">
                1<sup>er</sup> Congrès International des Greffiers
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">

              <p style="margin:0 0 24px;font-size:15px;color:rgba(245,245,245,0.7);line-height:1.6;">
                Bonjour <strong style="color:#F5F5F5;">${denomination}</strong>,<br/>
                Votre paiement a été confirmé avec succès. Retrouvez ci-dessous votre billet officiel de partenariat.
              </p>

              <!-- Grid info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding:0 12px 20px 0;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,245,245,0.4);">Partenaire</p>
                    <p style="margin:0;font-size:15px;font-weight:bold;color:#F5F5F5;">${denomination}</p>
                  </td>
                  <td width="50%" style="padding:0 0 20px 12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,245,245,0.4);">Catégorie</p>
                    <span style="display:inline-block;padding:4px 12px;border-radius:3px;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;background:${packColor}20;border:1px solid ${packColor}60;color:${packColor};">
                      ${packLabel}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:0 12px 0 0;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,245,245,0.4);">Date</p>
                    <p style="margin:0;font-size:15px;font-weight:bold;color:#F5F5F5;">08 – 10 Juin 2026</p>
                  </td>
                  <td width="50%" style="padding:0 0 0 12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,245,245,0.4);">Lieu</p>
                    <p style="margin:0;font-size:15px;font-weight:bold;color:#F5F5F5;">Libreville, Gabon</p>
                  </td>
                </tr>
              </table>

              <!-- Montant -->
              ${montant ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;">
                <tr>
                  <td>
                    <span style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:rgba(245,245,245,0.4);">Contribution : </span>
                    <span style="font-size:15px;font-weight:bold;color:#B8860B;">${montant} FCFA</span>
                  </td>
                </tr>
              </table>` : ""}

              <!-- Code de confirmation -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px dashed rgba(184,134,11,0.3);padding-top:24px;margin-top:4px;">
                <tr>
                  <td style="background:${packColor}15;border:1px solid ${packColor}50;border-radius:4px;padding:20px 24px;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,245,245,0.4);">Code de Confirmation</p>
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:26px;font-weight:bold;letter-spacing:4px;color:${packColor};">${reference}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:rgba(245,245,245,0.3);">
                      Conservez ce code précieusement — il vous sera demandé lors de l'accueil au congrès.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;background:rgba(184,134,11,0.05);border-top:1px solid rgba(184,134,11,0.15);">
              <p style="margin:0;font-size:12px;color:rgba(245,245,245,0.3);text-align:center;line-height:1.6;">
                Association des Femmes Greffières du Gabon (AF2G)<br/>
                Cet email a été envoyé automatiquement — merci de ne pas y répondre.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

  // Envoyer l'email de confirmation uniquement en cas de succès
  if (statut === "success") {
    const { data: rows } = await supabase
      .from("partenariats")
      .select("denomination, pack, montant, email")
      .eq("reference", ref)
      .single();

    if (rows?.email) {
      const html = buildEmailHtml({
        denomination: rows.denomination,
        pack:         rows.pack,
        montant:      rows.montant,
        reference:    ref,
        email:        rows.email,
      });

      const { error: emailError } = await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL ?? "Congrès AF2G <congres@af2g.org>",
        to:      [rows.email],
        subject: `Votre billet de partenariat — Congrès AF2G 2026 (${ref})`,
        html,
      });

      if (emailError) {
        console.error("Resend email error:", emailError);
        // On ne bloque pas la réponse si l'email échoue
      }
    }
  }

  return NextResponse.json({ ok: true });
}
