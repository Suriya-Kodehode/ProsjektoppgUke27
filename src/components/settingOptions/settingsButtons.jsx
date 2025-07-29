// Settings buttons configuration
export const getSettingsButtons = (openThemeModal) => [
    {
        id: 'theme',
        text: 'Theme',
        variant: 'primary',
        onClick: openThemeModal
    }
    // Add more buttons here as needed
    // {
    //     id: 'language',
    //     text: 'Language',
    //     variant: 'secondary',
    //     onClick: () => console.log('Language button clicked')
    // },
    // {
    //     id: 'notifications',
    //     text: 'Notifications',
    //     variant: 'outline',
    //     onClick: () => console.log('Notifications button clicked')
    // }
];

// Deprecated - use getSettingsButtons instead
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

// Function to add new settings button dynamically (if needed)
export const addSettingsButton = (buttonConfig) => {
    settingsButtons.push(buttonConfig);
};
