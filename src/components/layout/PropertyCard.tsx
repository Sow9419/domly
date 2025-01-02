'use client'

import { useState } from 'react'
import { Star, Heart, ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Property } from '@/data/properties'

const PropertyCard = ({ property }: { property: Property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className="relative group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3]">
        <button
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full z-10 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            previousImage();
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full z-10 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            nextImage();
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <img
          src={property.images[currentImageIndex].url}
          alt={property.images[currentImageIndex].alt}
          className="object-cover w-full h-full transition-transform duration-300"
        />

        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-white/80 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm">• {property.status}</span>
          </div>
          <button 
            className={`bg-white/80 p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'bg-blue-500' : ''}`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'text-white fill-current' : ''}`} />
          </button>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-white/70 backdrop-blur-[20px] rounded-t-[12px] transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-black/80">{property.title}</h3>
              <div className="flex items-center gap-1 text-black/80">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">{property.location}</p>
              </div>
            </div>
            <button className="bg-black p-2 rounded-full w-[42px] h-[42px] flex items-center justify-center -translate-y-2 translate-x-2">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5">
          {property.images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                currentImageIndex === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard