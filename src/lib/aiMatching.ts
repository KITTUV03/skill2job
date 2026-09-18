import { Job, ResumeProfile, MatchBreakdown } from '../types';

/**
 * Calculates a multi-dimensional AI match score considering:
 * - Skills (40%)
 * - Experience (25%)
 * - Industry / Domain (15%)
 * - Location / Remote (10%)
 * - Education & Certifications (10%)
 */
export function calculateMatchScore(job: Job, profile?: ResumeProfile): MatchBreakdown {
  if (!profile || !profile.skills || profile.skills.length === 0) {
    // Default baseline if no resume profile uploaded yet
    return {
      overallScore: 85,
      skillMatchScore: 80,
      experienceMatchScore: 85,
      locationMatchScore: 80,
      matchedSkills: job.skills.slice(0, 3),
      missingSkills: job.skills.slice(3)
    };
  }

  const userSkillsLower = profile.skills.map(s => s.toLowerCase());
  const jobSkillsLower = job.skills.map(s => s.toLowerCase());

  // 1. Skill Matching (40% Weight)
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  job.skills.forEach(skill => {
    const sLower = skill.toLowerCase();
    const isMatched = userSkillsLower.some(uSkill => 
      uSkill.includes(sLower) || sLower.includes(uSkill)
    );
    if (isMatched) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillMatchScore = job.skills.length > 0 
    ? Math.min(100, Math.round((matchedSkills.length / job.skills.length) * 100))
    : 85;

  // 2. Experience Level Fit (25% Weight)
  let experienceMatchScore = 75;
  if (profile.experienceYears >= 5) {
    if (job.experienceLevel.includes('4+') || job.experienceLevel.includes('5+') || job.experienceLevel.includes('4-8') || job.experienceLevel.includes('5-9')) {
      experienceMatchScore = 98;
    } else {
      experienceMatchScore = 88;
    }
  } else if (profile.experienceYears >= 2) {
    if (job.experienceLevel.includes('2-5') || job.experienceLevel.includes('3-7')) {
      experienceMatchScore = 96;
    } else {
      experienceMatchScore = 82;
    }
  } else {
    experienceMatchScore = 85;
  }

  // 3. Industry & Domain Fit (15% Weight)
  let domainMatchScore = 70;
  if (profile.targetDomains && profile.targetDomains.includes(job.domain)) {
    domainMatchScore = 98;
  }

  // 4. Location & Work Mode Fit (10% Weight)
  let locationMatchScore = 75;
  if (job.workMode === 'Remote') {
    locationMatchScore = 99;
  } else if (profile.locationPreference && job.location.toLowerCase().includes(profile.locationPreference.toLowerCase())) {
    locationMatchScore = 95;
  } else if (job.workMode === 'Hybrid') {
    locationMatchScore = 90;
  }

  // 5. Education & Certifications Fit (10% Weight)
  let educationMatchScore = 85;
  if (profile.education && profile.education.length > 0) {
    educationMatchScore = 95;
  }
  if (profile.certifications && profile.certifications.length > 0) {
    educationMatchScore = Math.min(100, educationMatchScore + 5);
  }

  // Weighted aggregate formula:
  // 40% Skills + 25% Experience + 15% Domain + 10% Location + 10% Education
  const weighted = (
    skillMatchScore * 0.40 +
    experienceMatchScore * 0.25 +
    domainMatchScore * 0.15 +
    locationMatchScore * 0.10 +
    educationMatchScore * 0.10
  );

  const overallScore = Math.min(99, Math.max(70, Math.round(weighted)));

  return {
    overallScore,
    skillMatchScore,
    experienceMatchScore,
    locationMatchScore,
    matchedSkills,
    missingSkills
  };
}
