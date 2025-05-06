import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

// Get a specific driver
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const drivers = await executeQuery(
      `SELECT d.*, u.name, u.email 
       FROM drivers d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = $1`,
      [id],
    )

    if (drivers.length === 0) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 })
    }

    return NextResponse.json(drivers[0])
  } catch (error) {
    console.error("Error fetching driver:", error)
    return NextResponse.json({ error: "Failed to fetch driver" }, { status: 500 })
  }
}

// Update a driver
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { license_number, license_expiry_date, phone_number, status, rating } = await request.json()

    // Check if driver exists
    const existingDriver = await executeQuery("SELECT * FROM drivers WHERE id = $1", [id])

    if (existingDriver.length === 0) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 })
    }

    // Update driver
    const result = await executeQuery(
      `UPDATE drivers 
       SET license_number = $1, license_expiry_date = $2, phone_number = $3, 
           status = $4, rating = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [license_number, license_expiry_date, phone_number, status, rating, id],
    )

    // Get user details
    const user = await executeQuery("SELECT name, email FROM users WHERE id = $1", [result[0].user_id])

    const driverWithUser = {
      ...result[0],
      name: user[0].name,
      email: user[0].email,
    }

    return NextResponse.json(driverWithUser)
  } catch (error) {
    console.error("Error updating driver:", error)
    return NextResponse.json({ error: "Failed to update driver" }, { status: 500 })
  }
}

// Delete a driver
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if driver exists
    const existingDriver = await executeQuery("SELECT * FROM drivers WHERE id = $1", [id])

    if (existingDriver.length === 0) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 })
    }

    // Check if driver is assigned to any active routes
    const activeRoutes = await executeQuery(
      `SELECT * FROM routes 
       WHERE driver_id = $1 
       AND status NOT IN ('completed', 'cancelled')`,
      [id],
    )

    if (activeRoutes.length > 0) {
      return NextResponse.json({ error: "Cannot delete driver that is assigned to active routes" }, { status: 400 })
    }

    // Delete driver
    await executeQuery("DELETE FROM drivers WHERE id = $1", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting driver:", error)
    return NextResponse.json({ error: "Failed to delete driver" }, { status: 500 })
  }
}

