// controllers/uploadController.js
import cloudinary from '../config/cloudinary.js';

// Upload image to Cloudinary
export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      // Return local file path if Cloudinary not configured
      return res.json({
        success: true,
        data: {
          url: `/uploads/${req.file.filename}`,
          public_id: null,
          local: true
        }
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'adventure-booking',
      resource_type: 'auto'
    });

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
}

// Upload multiple images
export async function uploadMultipleImages(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      // Return local file paths if Cloudinary not configured
      const uploadedImages = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        public_id: null,
        local: true
      }));

      return res.json({
        success: true,
        data: uploadedImages
      });
    }

    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'adventure-booking',
        resource_type: 'auto'
      })
    );

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id
    }));

    res.json({
      success: true,
      data: uploadedImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
}

// Delete image from Cloudinary
export async function deleteImage(req, res) {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    // Only delete from Cloudinary if public_id exists
    if (public_id && process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await cloudinary.uploader.destroy(public_id);
      return res.json({
        success: true,
        data: result
      });
    }

    res.json({
      success: true,
      message: 'Local file deletion handled separately'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete failed',
      error: error.message
    });
  }
}