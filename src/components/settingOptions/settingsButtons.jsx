// Settings buttons configuration
export const settingsButtons = [
    {
        id: 'theme',
        text: 'Theme',
        variant: 'primary',
        onClick: () => {
            // TODO: Add theme functionality
            console.log('Theme button clicked');
        }
    },
];

// Helper function to get settings buttons (for future extensibility)
export const getSettingsButtons = () => {
    return settingsButtons;
};

// Function to add new settings button dynamically (if needed)
export const addSettingsButton = (buttonConfig) => {
    settingsButtons.push(buttonConfig);
};
