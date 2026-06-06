import type { StaticImageData } from 'next/image'

import dine from '@/trisha/dine.jpg'
import milo from '@/trisha/milo.jpg'
import mirrorShot from '@/trisha/mirror shot.jpg'
import qt from '@/trisha/qt.jpg'
import tapa from '@/trisha/tapa.jpg'
import trishaCoffee from '@/trisha/trisha coffee.jpg'
import trishaWhite from '@/trisha/trisha white.jpg'
import trishaMain from '@/trisha/trisha.jpg'

import type { ImagePlaceholder } from './placeholder-images'

// Replaces placeholder remote images with local images in src/trisha/*
export const TrishaImages: ImagePlaceholder[] = [
  {
    id: '1',
    description: 'The Beginning',
    imageUrl: (dine as unknown as StaticImageData).src,
    imageHint: 'dine moment',
  },
  {
    id: '2',
    description: 'Our Favorite Memory',
    imageUrl: (milo as unknown as StaticImageData).src,
    imageHint: 'milo memory',
  },
  {
    id: '3',
    description: 'A Small Moment',
    imageUrl: (mirrorShot as unknown as StaticImageData).src,
    imageHint: 'mirror shot',
  },
  {
    id: '4',
    description: 'Dreaming Together',
    imageUrl: (qt as unknown as StaticImageData).src,
    imageHint: 'qt vibe',
  },
  {
    id: '5',
    description: 'Sweet Time',
    imageUrl: (tapa as unknown as StaticImageData).src,
    imageHint: 'tapa moment',
  },
  {
    id: '6',
    description: 'Coffee & Smiles',
    imageUrl: (trishaCoffee as unknown as StaticImageData).src,
    imageHint: 'trisha coffee',
  },
  {
    id: '7',
    description: 'Soft & Bright',
    imageUrl: (trishaWhite as unknown as StaticImageData).src,
    imageHint: 'trisha white',
  },
  {
    id: '8',
    description: 'Just Us',
    imageUrl: (trishaMain as unknown as StaticImageData).src,
    imageHint: 'trisha main',
  },
]

