export function useDocuments() {
    const documents = [
        {
            id: '1',
            title: 'MI Kelvin',
            url: 'https://drive.google.com/drive/u/0/folders/14RJFLWuwc4IZ2SPpdgFL-AD2E9b3rH8K',
            icon: 'assignment-ind',
        },
        {
            id: '2',
            title: 'Expo Documentation',
            url: 'https://docs.expo.dev/get-started/installation/',
            icon: 'settings',
        },
        {
            id: '3',
            title: 'React Navigation Documentation',
            url: 'https://reactnavigation.org/docs/getting-started/',
            icon: 'settings',
        },
    ];

    return documents;
}
