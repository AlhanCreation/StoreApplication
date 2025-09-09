export const roleAuth = (...allowedRoles) => {
	return (req, res, next) => {
	  if (!req.user) {
		return res.status(401).json({ message: 'Authentication required' });
	  }
  
	  if (!allowedRoles.includes(req.user.role)) {
		return res.status(403).json({ 
		  message: 'Access denied. Insufficient permissions.',
		  requiredRoles: allowedRoles,
		  userRole: req.user.role
		});
	  }
  
	  next();
	};
  };
  
  // Specific role middlewares
  export const adminOnly = roleAuth('System Administrator');
  export const userOrAdmin = roleAuth('Normal User', 'System Administrator');
  export const storeOwnerOrAdmin = roleAuth('Store Owner', 'System Administrator');
  export const allRoles = roleAuth('System Administrator', 'Normal User', 'Store Owner');