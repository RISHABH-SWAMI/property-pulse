import React from 'react'
import { FaShare } from 'react-icons/fa'
import {
    FacebookShareButton,
    EmailShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    EmailIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
    return (
        <>
            <h3 className='text-xl font-bold text-center pt-2' >Share This Property</h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={`#${property.type.replace(/\s/g, '')}For Rent`}
                >
                    <FacebookIcon round={true} size={40} />
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    title={property.name}
                    hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon round={true} size={40} />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={shareUrl}
                    title={property.name}
                    separator=':: '
                >
                    <WhatsappIcon round={true} size={40} />
                </WhatsappShareButton>
                <EmailShareButton
                    url={shareUrl}
                    subject={property.name}
                    body={` Check out this property listing: ${shareUrl}`}
                >
                    <EmailIcon round={true} size={40} />
                </EmailShareButton>
            </div>
        </>
    )
}

export default ShareButtons
