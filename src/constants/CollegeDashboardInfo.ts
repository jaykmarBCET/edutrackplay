import { BellIcon, BookOpenIcon, ChartBarIcon, ChatBubbleLeftRightIcon, CreditCardIcon, DocumentTextIcon, UserGroupIcon } from "@heroicons/react/24/outline";


const dashboardItems = [
    {
      title: 'Student Requests',
      description: 'Manage student applications and requests for admission.',
      icon: DocumentTextIcon,
    },
    {
      title: 'Notifications',
      description: 'Stay updated with all the latest alerts and announcements.',
      icon: BellIcon,
    },
    {
      title: 'Classes',
      description: 'Organize and manage all academic classes and courses.',
      icon: BookOpenIcon,
    },
    {
      title: 'Teachers',
      description: 'View and manage the directory of all teachers and staff.',
      icon: UserGroupIcon,
    },
    {
      title: 'Payment Due',
      description: 'Track and manage upcoming fee payments and financial records.',
      icon: CreditCardIcon,
    },
    {
      title: 'Student Progress',
      description: 'Monitor the academic performance and progress of students.',
      icon: ChartBarIcon,
    },
    {
      title: 'Teacher Feedback',
      description: 'Review and provide feedback on teacher performance.',
      icon: ChatBubbleLeftRightIcon,
    },
  ];


  export {
    dashboardItems
  }