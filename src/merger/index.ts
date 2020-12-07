import mPromise from 'bluebird';
import {readFile} from '../utils/read-file';
import {createCanvas} from '../utils/canvas'

interface IImageInfo {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface IImageProp extends IImageInfo {
    image: string;
}

interface IImageFileProp extends IImageInfo{
    image: File;
}


export const mergeStaticImage = async (
    imageContents: IImageProp[]
): Promise<String> => {
    const canvas = createCanvas(100, 400);


    return  Promise.resolve('');
}

export const mergeStaticImageFile = async (
    imageFiles: IImageFileProp[]
): Promise<String> => {
    const imageList = await mPromise.mapSeries(imageFiles, image => {
        return readFile(image.image, 'readAsText').then(content => ({
            ...image,
            image: content,
        }))
    })
    return mergeStaticImage(imageList);
}


export const mergeImage = (imageList: IImageProp[]): string=>  {
    return ''
}



