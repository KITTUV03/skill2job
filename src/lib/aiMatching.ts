import { Job, ResumeProfile, MatchBreakdown } from '../types';

export function calculateMatchScore(job: Job, profile?: ResumeProfile): MatchBreakdown {
  if (!profile || !profile.skills || profile.skills.length === 0) {
    // Default baseline if no resume profile uploaded yet
    return {
      overallScore: 70,
      skillMatchScore: 70,
      experienceMatchScore: 75,
      locationMatchScore: 65,
      matchedSkills: job.skills.slice(0, 3),
      missingSkills: job.skills.slice(3)
    };
  }

  const userSkillsLower = profile.skills.map(s => s.toLowerCase());
  const jobSkillsLower = job.skills.map(s => s.toLowerCase());

  // 1. Skill Matching
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
    : 80;

  // 2. Domain & Experience Fit
  let experienceMatchScore = 75;
  if (profile.targetDomains && profile.targetDomains.includes(job.domain)) {
    experienceMatchScore += 15;
  }
  
  // Normalize experience matching
  if (profile.experienceYears >= 5 && (job.experienceLevel.includes('5+') || job.experienceLevel.includes('4-7') || job.experienceLevel.includes('6-10'))) {
    experienceMatchScore += 10;
  } else if (profile.experienceYears >= 2 && profile.experienceYears <= 5) {
    experienceMatchScore += 5;
  }
  experienceMatchScore = Math.min(100, experienceMatchScore);

  // 3. Location Fit
  let locationMatchScore = 70;
  if (job.workMode === 'Remote') {
    locationMatchScore = 98;
  } else if (profile.locationPreference && job.location.toLowerCase().includes(profile.locationPreference.toLowerCase())) {
    locationMatchScore = 95;
  }

  // Weighted overall calculation: 50% skills, 30% experience/domain, 20% location
  const overallScore = Math.min(
    99,
    Math.round(skillMatchScore * 0.50 + experienceMatchScore * 0.30 + locationMatchScore * 0.20)
  );

  return {
    overallScore,
    skillMatchScore,
    experienceMatchScore,
    locationMatchScore,
    matchedSkills,
    missingSkills
  };
}
