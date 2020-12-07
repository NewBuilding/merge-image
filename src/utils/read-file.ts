/**
 * 
 * @param 读取文件内容
 */

type IDataType  = 'readAsDataURL'| 'readAsText' | 'readAsBinaryString' | 'readAsArrayBuffer'

export const readFile = (
    file: File,
    method: IDataType = 'readAsDataURL',
):Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader:any = new FileReader();

        if(!reader[method]) {
            throw new Error('File read error, dataType not support');
        }

        reader.onerror = () => {
            reject(new Error('File read error'));
        };

        reader.onload = () => {
            resolve(reader.result);
        };

        reader[method](file);
    });
};
