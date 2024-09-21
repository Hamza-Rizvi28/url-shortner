import prisma from "./prisma";

export const saveShortenedUrl = async (longUrl : string, hashedUrlKey : string) => {
    return await prisma.shortenedUrl.create({
        data: {
          longUrl: longUrl,
          shortUrl: `http://localhost/url/${hashedUrlKey}`,
          key: hashedUrlKey,
        },
      });
};

export const urlExists = async (longUrl: string ) => {
   return await prisma.shortenedUrl.findFirst({
    select: {
      longUrl: true,
      shortUrl: true,
      key: true,
      createdAt: true
    },
    where: {
      longUrl: longUrl
    }
   });
};

export const getLongUrlByKey = async (hashedUrlKey : string) => {
  return await prisma.shortenedUrl.findFirst({
    select: {
      longUrl: true,
    },
    where: {
      key: hashedUrlKey
    }
   });
};