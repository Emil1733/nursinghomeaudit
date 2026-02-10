
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  // Search by Name, License Number, or City
  const { data, error } = await supabase
    .from("facilities")
    .select("id, name, city, license_number")
    .or(`name.ilike.%${query}%,license_number.ilike.%${query}%,city.ilike.%${query}%`)
    .limit(8);

  if (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
