import { prisma } from "@/config";
import { NonSchoolDays, Prisma } from "@prisma/client";
import { error } from "console";

function getNonSchoolDays(): Promise<NonSchoolDays[]> {
  return prisma.nonSchoolDays.findMany();
};

function getNonSchoolDaysById(idNonSchoolDay: number): Promise<NonSchoolDays> {
  return prisma.nonSchoolDays.findUnique({
    where: { id: idNonSchoolDay }
  });
};

function getNonSchoolDaysByqueries(
  type: Prisma.EnumTypeNonSchoolDaysFilter,
  description: string = '',
  shift?: Prisma.EnumShiftFilter,
  date?: Date,

): Promise<NonSchoolDays[]> {
  return prisma.nonSchoolDays.findMany({
    where: {
      type: type !== undefined ? type : undefined,
      description: description !== '' ? description : undefined,
      shift: shift !== undefined ? shift : undefined,
      date: date !== undefined ? date : undefined
    }
  });
};

function getNonSchoolDaysByOrderCreatedAt(count: number): Promise<NonSchoolDays[]> {
  return prisma.nonSchoolDays.findMany({
    orderBy: { createdAt: 'desc' },
    take: count
  });
}

async function postManyNonSchoolDays(nonSchoolDays: any) {
  try{
    return await prisma.nonSchoolDays.createMany({
      data: nonSchoolDays
    });
  } catch (error) {
    return error;
  };
};



function putNonSchoolDaysById(idNonShcoolDays: number, nonSchoolDays: Prisma.NonSchoolDaysUpdateInput) {
  return prisma.nonSchoolDays.update({
    where: { id: idNonShcoolDays },
    data: { ...nonSchoolDays }
  });
};

function deleteNonSchoolDaysById(idNonShcoolDays: number) {
  return prisma.nonSchoolDays.delete({
    where: { id: idNonShcoolDays },
  });
};

const nonSchoolDaysRespository = {
  getNonSchoolDays,
  getNonSchoolDaysById,
  getNonSchoolDaysByqueries,
  getNonSchoolDaysByOrderCreatedAt,
  postManyNonSchoolDays,
  putNonSchoolDaysById,
  deleteNonSchoolDaysById
};

export default nonSchoolDaysRespository;