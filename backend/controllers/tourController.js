import Tour from "../models/Tour.js";

export const getAllTours = async (req, res) => {
  try {
    const { location } = req.query;
    // console.log("🔍 Location query received:", location);

    let query = {};
    if (location) {
      const cleanLocation = location.trim();
      query.location = { $regex: cleanLocation, $options: "i" };
    }

    const tours = await Tour.find(query);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({error: err.message});
  } 
};

export const createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ msg: "Tour deleted" });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

// ✅ Get tours by location (used in SearchBar)
export const getToursByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    console.log("🔍 Location param received:", location);

    const tours = await Tour.find({
      location: { $regex: new RegExp(location.trim(), "i") }, // case-insensitive partial match
    });

    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // ❌ Prevent overwriting the _id field
    if (updateData._id) delete updateData._id;

    console.log("🛠 Updating ID:", id, "with:", updateData);

    const updatedTour = await Tour.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(updatedTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

