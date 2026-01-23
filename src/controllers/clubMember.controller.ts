import ClubMemberDTO from "@dtos/clubMember.dto"
import { updateOneProcessingAchievements } from "@services/clubMember.service"
import { IClubMember } from "srcinterfaces/clubMember.interface"



function cleanEmptyFields(obj: any): Partial<IClubMember> {
  const newObj: any = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (val !== null && val !== undefined && val !== "") {
      if (typeof val === 'number' && Number.isNaN(val)) {
        return;
      }
      newObj[key] = val;
    }
  });
  return newObj as Partial<IClubMember>;
}

async function updateMember(rawdata: any | IClubMember) {
  try {
    let memberData: IClubMember;

    if (isClubMember(rawdata)) {
      memberData = rawdata;
    } else {
      const cleanedRaw = cleanEmptyFields(rawdata);
      memberData = new ClubMemberDTO(cleanedRaw);
    }

    const cleanedData = cleanEmptyFields(memberData);

    const response = await updateOneProcessingAchievements(cleanedData as IClubMember);
    return response;
  } catch (err) {
    console.error(err)
    throw new Error("ERROR_UPDATING_MEMBER")
  }
}

const isClubMember = (value: IClubMember): value is IClubMember => {
  if (value.playerName)
    return true
  else
    return false;
}

export { updateMember }