/* eslint-disable @typescript-eslint/no-explicit-any */
import { uniqueId } from "lodash";
interface MenuitemsType {
	[x: string]: any;
	id?: string;
	navlabel?: boolean;
	subheader?: string;
	title?: string;
	icon?: any;
	href?: string;
	children?: MenuitemsType[];
	bgcolor?: any;
	chip?: string;
	chipColor?: string;
	variant?: string;
	external?: boolean;
}


const Menuitems: MenuitemsType[] = [
	{
		navlabel: true,
		subheader: "Home",
	},

	{
		id: uniqueId(),
		title: "Dashboard 1",
		icon: 'screencast-2-line-duotone',
		href: "/",
		bgcolor: "primary",
	},
	// {
	// 	id: uniqueId(),
	// 	title: "Dashboard 2",
	// 	icon: 'chart-line-duotone',
	// 	href: "/dashboards/dashboard2",
	// 	bgcolor: "primary",
	// },
	//   {
	//     id: uniqueId(),
	//     title: "Frontend Pages",
	//     icon: 'feed-line-duotone',
	//     href: "/frontend-pages/homepage",
	//     bgcolor: "error",
	//     children: [
	//       {
	//         id: uniqueId(),
	//         title: "Homepage",
	//         href: "/frontend-pages/homepage",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "About Us",
	//         href: "/frontend-pages/about",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "Blog",
	//         href: "/frontend-pages/blog",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "Blog Details",
	//         href: "/frontend-pages/blog-detail",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "Contact",
	//         href: "/frontend-pages/contact",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "Portfolio",
	//         href: "/frontend-pages/portfolio",
	//       },
	//       {
	//         id: uniqueId(),
	//         title: "Pricing",
	//         href: "/frontend-pages/pricing",
	//       },
	//     ]
	//   },
	{
		navlabel: true,
		subheader: "Apps",
	},
	// {
	// 	id: uniqueId(),
	// 	title: "Contacts",
	// 	icon: 'phone-line-duotone',
	// 	chipColor: "secondary",
	// 	href: "/apps/contacts",
	// 	bgcolor: "primary",
	// },

	// {
	// 	id: uniqueId(),
	// 	title: "Blog",
	// 	icon: 'align-vertical-spacing-line-duotone',
	// 	href: "/apps/blog/",
	// 	bgcolor: "warning",
	// 	children: [
	// 		{
	// 			id: uniqueId(),
	// 			title: "Posts",
	// 			href: "/apps/blog/post",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Detail",
	// 			href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
	// 		},
	// 	],
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Ecommerce",
	// 	icon: 'smart-speaker-minimalistic-line-duotone',
	// 	href: "/apps/ecommerce/",
	// 	bgcolor: "error",
	// 	children: [
	// 		{
	// 			id: uniqueId(),
	// 			title: "Shop",
	// 			href: "/apps/ecommerce/shop",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Shop V2",
	// 			href: "/apps/ecommerce/shop2",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Detail",
	// 			href: "/apps/ecommerce/detail/1",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Detail V2",
	// 			href: "/apps/ecommerce/detail2/1",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "List",
	// 			href: "/apps/ecommerce/list",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Checkout",
	// 			href: "/apps/ecommerce/checkout",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Add Product",
	// 			href: "/apps/ecommerce/add-product",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Edit Product",
	// 			href: "/apps/ecommerce/edit-product",
	// 		},
	// 	],
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Chats",
	// 	icon: 'chat-round-unread-line-duotone',
	// 	bgcolor: "info",
	// 	href: "/apps/chats",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Users",
	// 	icon: 'user-rounded-line-duotone',
	// 	href: "/apps/user-profile/profile",
	// 	bgcolor: "primary",
	// 	children: [
	// 		{
	// 			id: uniqueId(),
	// 			title: "Profile",
	// 			href: "/apps/user-profile/profile",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Followers",
	// 			href: "/apps/user-profile/followers",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Friends",
	// 			href: "/apps/user-profile/friends",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Gallery",
	// 			href: "/apps/user-profile/gallery",
	// 		},
	// 	],
	// },
	{
		id: uniqueId(),
		title: "Users v2",
		icon: 'user-speak-line-duotone',
		bgcolor: "primary",
		href: "/apps/user-profile2/profile",
		children: [
			{
				id: uniqueId(),
				title: "Profile",
				href: "/analisis",
			},
			// {
			// 	id: uniqueId(),
			// 	title: "Teams",
			// 	href: "/apps/user-profile2/teams",
			// },
			// {
			// 	id: uniqueId(),
			// 	title: "Projects",
			// 	href: "/apps/user-profile2/projects",
			// },
			// {
			// 	id: uniqueId(),
			// 	title: "Connections",
			// 	href: "/apps/user-profile2/connections",
			// },
		],
	},
	// {
	// 	id: uniqueId(),
	// 	title: "Notes",
	// 	icon: 'notification-unread-line-duotone',
	// 	bgcolor: "primary",
	// 	href: "/apps/notes",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Calendar",
	// 	icon: 'calendar-line-duotone',
	// 	bgcolor: "primary",
	// 	href: "/apps/calendar",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Email",
	// 	icon: 'mailbox-line-duotone',
	// 	bgcolor: "warning",
	// 	href: "/apps/email",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Tickets",
	// 	icon: 'ticket-sale-line-duotone',
	// 	bgcolor: "error",
	// 	href: "/apps/tickets",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Kanban",
	// 	icon: 'notes-line-duotone',
	// 	bgcolor: "secondary",
	// 	href: "/apps/kanban",
	// },

	{
		id: uniqueId(),
		title: "Registros",
		icon: 'checklist-minimalistic-line-duotone',
		bgcolor: "primary",
		href: "/apps/invoice/list",
		children: [
			{
				id: uniqueId(),
				title: "Datos Pacientes",
				href: "/registros",
			},
			{
				id: uniqueId(),
				title: "Mediciones",
				href: "/registros/mediciones",
			},
			{
				id: uniqueId(),
				title: "Pruebas",
				href: "/registros/pruebas",
			},
			// {
			// 	id: uniqueId(),
			// 	title: "Edit",
			// 	href: "/apps/invoice/edit/PineappleInc",
			// },
		],
	}
];

export default Menuitems;
