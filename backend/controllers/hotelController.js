import Hotel from "../models/Hotel.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // ✅ Fix profileImage if it's a relative path
    if (
      hotel.profileImage &&
      !hotel.profileImage.startsWith("http")
    ) {
      hotel.profileImage = `${req.protocol}://${req.get("host")}/${hotel.profileImage.replace(/\\/g, "/")}`;
    }

    // ✅ Fix each gallery image if any
    if (hotel.gallery && hotel.gallery.length > 0) {
      hotel.gallery = hotel.gallery.map((imgPath) => {
        if (imgPath.startsWith("http")) return imgPath;
        return `${req.protocol}://${req.get("host")}/${imgPath.replace(/\\/g, "/")}`;
      });
    }

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};