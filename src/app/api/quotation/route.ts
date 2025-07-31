import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanityClient";
import { v4 as uuidv4 } from "uuid";
import { QuotationItem } from "@/types/quotationTypes";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client,
      items,
      tax,
      quotationConditions,
      totals
    } = body;



    const payload = {
      _type: "addQuotation",
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client: {
        _type: "client",
        name: client.name,
        company: client.company,
        contact: client.contact,
        email: client.email,
      },
      items: items.map((item: QuotationItem) => ({
        _type: "quotationItem",
        _key: item._key || uuidv4(),
        itemName: item.itemName,
        itemRate: item.itemRate,
        itemQty: item.itemQty,
        itemAmount: item.itemAmount,
      })),
      quotationConditions,
      tax: {
        isApplied: tax.isApplied,
        percentage: tax.percentage,
      },
      totals: {
        subTotal: totals.subTotal,
        grandTotal: totals.grandTotal
      }

    };

    const result = await sanityClient.create(payload);

    return NextResponse.json({
      success: true,
      message: "Quotation saved to Sanity",
      data: result,
    });

  } catch (error) {
    console.error("Error saving to Sanity:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const query = `*[_type == "addQuotation"]`
    const data = await sanityClient.fetch(query)
    return NextResponse.json({ success: true, quotations: data })
  } catch (err) {
    console.error("Fetch error:", err)
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json()
    await sanityClient.delete(_id)
    return NextResponse.json({ success: true, message: 'Quotation deleted successfully' })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Quotation deletion failed', error }, { status: 500 })
  }
}

// PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      _id,
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client,
      items,
      tax,
      quotationConditions,
      totals
    } = body;

    const updatedDoc = {
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client,
      items,
      tax,
      quotationConditions,
      totals,
    };

    const result = await sanityClient.patch(_id)
      .set(updatedDoc)
      .commit();

    return NextResponse.json({
      success: true,
      message: "Quotation updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update quotation" },
      { status: 500 }
    );
  }
}