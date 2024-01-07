export const NO_SPECIAL_CHARS_REGEX = "[A-Za-z0-9 ]+"
/**
 * download a file for a specific name
 * @param file : a blob or file object to download
 * @param name : the name you want for downloaded file
 */
export function downloadFile(url: string, name = "file.txt") {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function getFileName(filePath: string) {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    return fileName;
}

