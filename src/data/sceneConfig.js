import phrasesData from './phrases.json';

/**
 * Scene configuration loader that combines animation, text, and visual settings
 * This utility loads all configuration needed for the PixelArtScene component
 */

const sceneConfig = {
  backgroundImagePath: 'src/assets/backgrounds/beach-scene.svg',
  
  characterAnimationConfig: {
    frame1ImagePath: 'src/assets/lapis-arm-1.svg',
    frame2ImagePath: 'src/assets/lapis-arm-2.svg',
    frameRate: phrasesData.animationConfig?.frameRate || 1,
    size: 'large',
    fallbackImagePath: null,
  },

  textSequenceConfig: {
    phrases: phrasesData.phrases || [],
    defaultTransitionStyle: 'fade',
    defaultPositionClass: 'bottom-center',
  },

  navigationConfig: {
    debounceDelay: 300,
    enabled: true,
  },
};

/**
 * Get scene configuration
 * @returns {Object} Complete scene configuration object
 */
export const getSceneConfig = () => {
  return { ...sceneConfig };
};

/**
 * Validate scene configuration
 * @param {Object} config - Configuration object to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateSceneConfig = (config) => {
  const errors = [];

  if (!config.backgroundImagePath) {
    errors.push('backgroundImagePath is required');
  }

  if (!config.characterAnimationConfig) {
    errors.push('characterAnimationConfig is required');
  } else {
    if (!config.characterAnimationConfig.frame1ImagePath) {
      errors.push('characterAnimationConfig.frame1ImagePath is required');
    }
    if (!config.characterAnimationConfig.frame2ImagePath) {
      errors.push('characterAnimationConfig.frame2ImagePath is required');
    }
    if (config.characterAnimationConfig.frameRate && config.characterAnimationConfig.frameRate <= 0) {
      errors.push('characterAnimationConfig.frameRate must be greater than 0');
    }
  }

  if (!config.textSequenceConfig) {
    errors.push('textSequenceConfig is required');
  } else {
    if (!Array.isArray(config.textSequenceConfig.phrases)) {
      errors.push('textSequenceConfig.phrases must be an array');
    } else if (config.textSequenceConfig.phrases.length === 0) {
      errors.push('textSequenceConfig.phrases must have at least one phrase');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate and get phrases from configuration
 * Filters out empty phrases and applies duration defaults
 * @param {Array} phrases - Array of phrase objects
 * @returns {Array} Validated phrases
 */
export const getValidatedPhrases = (phrases) => {
  if (!Array.isArray(phrases)) {
    return [];
  }

  return phrases
    .filter((phrase) => {
      // Skip empty phrases
      return phrase.content && phrase.content.trim() !== '';
    })
    .map((phrase) => ({
      ...phrase,
      displayDuration: phrase.displayDuration && phrase.displayDuration > 0 
        ? phrase.displayDuration 
        : 2000, // Default to 2000ms if invalid
    }));
};

// Validate configuration on load
const validation = validateSceneConfig(sceneConfig);
if (!validation.valid) {
  console.warn('Scene configuration validation errors:', validation.errors);
}

export default sceneConfig;
