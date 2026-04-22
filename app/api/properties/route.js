import connectedDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";


export const GET = async () => {
    try {
        await connectedDB();
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), { status: 200 })
        // return new Response('Hello world', {status: 200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}

export const POST = async (request) => {
    try {
        await connectedDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {
                status: 401
            })
        }

        const { userId } = sessionUser;

        const formData = await request.formData();
        // get all amenities
        const ameneties = formData.getAll('amenities');
        // get all images
        const images = formData.getAll('images').filter((image) => image !== '');

        // create propertyData object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode')
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            ameneties,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
            // images,
        }

        // upload image(s) to cloudinary
        const imageUploadPromises = [];

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray);

            //convert the image data into base64
            const imageBase64 = imageData.toString('base64');

            //Make request to upload to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                folder: 'propertypulse',
            }
            );
            imageUploadPromises.push(result.secure_url);

            // wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises);
            // Add uploaded images to database object
            propertyData.images = uploadedImages;
        }

        // saving property object to database
        const newProperty = new Property(propertyData);
        await newProperty.save();

        // After saving new property object redirecting to properties details page
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

        // return new Response(JSON.stringify({ message: "success" }), { status: 200 })

    } catch (error) {
        return new Response('Failed to add Property', {
            status: 500
        })
    }
}