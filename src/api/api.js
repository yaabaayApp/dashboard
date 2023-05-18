const baseUrl = process.env.REACT_APP_BASE_URL
const userApi = `${baseUrl}/user`
const authApi = `${baseUrl}/auth`
const contactUsApi = `${baseUrl}/contactUs`
const contentApi = `${baseUrl}/content`
const categoryApi = `${baseUrl}/categories`
const categoryOrderApi = `${baseUrl}/categoriesOrder`
//CONTROL PANEL
// const controlPanel = `/${cpBaseUrl}`

module.exports = {
  //user
  getAllUsers: `${userApi}`,
  getUsersByRole: `${userApi}/getUsersByRole/`,
  getUserById: `${userApi}/`,  //  {{url}}user/:userId
  getAdminById: `${userApi}/getAdmin/`,
  getUserAgents: `${userApi}/getUserAgents/`,  //  {{url}}user/:userId
  userAgents: `/userAgents/`,
  userEdit: `/userEdit/`,
  forgetPassword: `${userApi}/requestRetrieveUserPassword`,
  updateUserPassword: `${userApi}/updateUserPassword`,
  userDelete: `${userApi}/delete/`,
  adminUpdateUserById: `${userApi}/adminUpdateUserById/`,
  //auth
  signUp: `${authApi}/signUp`,
  adminSignUp: `${authApi}/adminSignUp`,
  adminSignIn: `${authApi}/adminSignIn`,
  //contact-us
  contactUsCreate: `${contactUsApi}/create`,
  getAllContactUs: `${contactUsApi}`,
  getUnreadMessagesCount: `${contactUsApi}/getUnreadMessagesCount`,
  getContactUsById: `${contactUsApi}/`,
  updateContactUsById: `${contactUsApi}/updateContactUsById/`,
  updateMessageStatus: `${contactUsApi}/updateMessageStatus/`,
  contactUsEdit: `/contactUsEdit/`,
  contactUsDelete: `${contactUsApi}/delete/`,
  //intros
  getAllIntros: `${contentApi}/getAllIntros`,
  introCreate: `${contentApi}/introCreate`,
  introDelete: `${contentApi}/deleteIntro/`,
  getIntroById: `${contentApi}/getIntroById/`,
  updateIntroById: `${contentApi}/updateIntroById/`,
  introEdit: `/introEdit/`,
  //sliders
  getAllSliders: `${contentApi}/getAllSliders`,
  sliderCreate: `${contentApi}/sliderCreate`,
  sliderDelete: `${contentApi}/deleteSlider/`,
  getSliderById: `${contentApi}/getSliderById/`,
  updateSliderById: `${contentApi}/updateSliderById/`,
  sliderEdit: `/sliderEdit/`,
  //intros
  getFAQs: `${contentApi}/getFAQs`,
  createFAQ: `${contentApi}/createFAQ`,
  deleteFAQ: `${contentApi}/deleteFAQ/`,
  getFAQById: `${contentApi}/getFAQById/`,
  updateFAQById: `${contentApi}/updateFAQById/`,
  editFAQ: `/editFAQ/`,
  //CATEGORIES
  getAllCategories: `${categoryApi}`,
  getSubCategories: `${categoryApi}/getSubCategories/`,
  getCategoryById: `${categoryApi}/`,
  categoryDelete: `${categoryApi}/delete/`,
  addCategory: `${categoryApi}/create`,
  updateCategoryById: `${categoryApi}/update/`,
  categoryEdit: `/categoryEdit/`,
  // CATEGORIES MEDIA
  categoryMedia: `/categoryMedia/`,
  getAllServiceImages: `/getAllServiceImages`,
  //CATEGORIES ORDERS
  getAllCategoriesOrders: `${categoryOrderApi}/getAll`,
  getLatestTenOrders: `${categoryOrderApi}/latestTenOrders`,
  categoryOrderDelete: `${categoryOrderApi}/delete/`,
  goToCategoriesOrders: `/categoryOrderControl/`,
  categoryOrderEdit: `/categoryOrderEdit/`,
  getCategoryOrderById: `${categoryOrderApi}/`,
  categoriesOrderAdminCreateUser: `${categoryOrderApi}/adminCreateUser`,
  categoryOrderCreateGuest: `${categoryOrderApi}/createGuest`,
  updateCategoryOrderById: `${categoryOrderApi}/adminUpdate/`,
  //settings
  getAllSettings: `${contentApi}/getAllSettings`,
  saveSettings: `${contentApi}/settingSave`,
  getPrivacy: `${contentApi}/getPrivacy`,
  //Dashboard
  getLeads: `${userApi}/getLeads`,
  getAgents: `${userApi}/getAgents`,
  getCategoriesCount: `${categoryApi}/getCategoriesCount`,
  //Media
  getCategoryMedia: `${categoryApi}/getCategoryMedia/`,
  deleteSingleCategoryMedia: `${categoryApi}/deleteSingleCategoryMedia/`,
  uploadServiceMedia: `${categoryApi}/uploadServiceMedia/`,




}
